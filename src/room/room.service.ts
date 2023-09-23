import { BadRequestException, Body, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dtos/create-room.dto';
import { JoinRoomDto } from './dtos/join-room.dto';
import {
  MuteDurations,
  RoomType,
  UserRole,
  UserStatus,
  UserStatusGroup,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Response } from 'src/global/interfaces';
import { Room } from './dtos/find-room.dto';
import { UserService } from 'src/user/user.service';
import { MuteUserInRoomDto } from './dtos/mute-user-in-room.dto';
import { PaginationQueryDto } from 'src/global/dto/pagination-query.dto';
import { serializePaginationResponse } from 'src/user/helpers';
@Injectable()
export class RoomService {
  private readonly logger: Logger = new Logger('room');
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async findRoomByName(
    body: JoinRoomDto | CreateRoomDto | MuteUserInRoomDto,
  ): Promise<Room | null> {
    if (body instanceof CreateRoomDto) {
      for (let e in RoomType) {
        const room = await this.prismaService.roomChat.findUnique({
          where: {
            id: body.name,
            type: e as RoomType,
          },
        });
        if (room) {
          return {
            name: room.id,
            type: e,
            password: room.password,
          };
        }
      }
      return null;
    } else {
      const room = await this.prismaService.roomChat.findUnique({
        where: {
          id: body.name,
          type: body.type,
        },
      });
      if (room) {
        return {
          name: room.id,
          type: room.type,
          password: room.password,
        };
      }
    }
  }

  async createRoom(userId: string, room: CreateRoomDto): Promise<Response> {
    try {
      if (!userId) {
        return {
          status: 404,
          message: 'User Was Not Found',
        };
      }
      const pRoom = await this.findRoomByName(room);
      if (pRoom) {
        return {
          status: 400,
          message: 'Room Exists',
        };
      }
      let passwordToBeSaved = null;
      if (room.type === RoomType.PROTECTED) {
        if (!room?.password || room.password === '') {
          return {
            status: 400,
            message: 'Password Must Not Be Empty',
          };
        }
        const salt = await bcrypt.genSalt(10);
        let hashedPassword: string = await bcrypt.hash(room.password, salt);
        passwordToBeSaved = hashedPassword;
      }
      await this.prismaService.roomChat.create({
        data: {
          id: room.name,
          type: room.type,
          password: passwordToBeSaved,
        },
      });
      await this.createNewMember(userId, room.name, UserRole.ADMIN);
      return {
        status: 201,
        message: 'Room created successfully',
      };
    } catch (e) {
      this.logger.error('createRoom failed');
      return {
        status: 500,
        message: 'Failed to create Room',
      };
    }
  }

  private async isUserAMember(
    userId: string,
    roomName: string,
  ): Promise<boolean> {
    const res = await this.prismaService.roomChatConversation.findUnique({
      where: {
        roomChatId_userId: {
          roomChatId: roomName,
          userId: userId,
        },
      },
    });
    if (res && (res.userStatus === UserStatusGroup.MUTED || !res.userStatus)) {
      return true;
    } else {
      return false;
    }
  }

  private async createNewMember(
    userId: string,
    roomName: string,
    userRole: UserRole,
  ) {
    await this.prismaService.roomChatConversation.create({
      data: {
        userRole: userRole as UserRole,
        userStatus: null,
        RoomChat: {
          connect: {
            id: roomName,
          },
        },
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async getUserRoomStatus(
    userId: string,
    roomName: string,
  ): Promise<UserStatusGroup | null> {
    const user = await this.prismaService.roomChatConversation.findUnique({
      where: {
        roomChatId_userId: {
          roomChatId: roomName,
          userId: userId,
        },
      },
      select: {
        userStatus: true,
      },
    });
    if (user && user?.userStatus) {
      return user.userStatus;
    } else {
      return null;
    }
  }

  async updateUserStatusInGroup(
    userId: string,
    roomName: string,
    status: UserStatusGroup | null,
  ) {
    await this.prismaService.roomChatConversation.update({
      where: {
        roomChatId_userId: {
          roomChatId: roomName,
          userId: userId,
        },
      },
      data: {
        userStatus: status,
      },
    });
  }

  async joinRoom(userId: string, room: JoinRoomDto): Promise<Response> {
    if (!userId) {
      return {
        status: 404,
        message: 'User Was Not Found',
      };
    }
    const pRoom = await this.findRoomByName(room);
    if (!pRoom) {
      return {
        status: 400,
        message: 'Room Does Not Exist',
      };
    }

    const isUserAMember = await this.isUserAMember(userId, room.name);
    if (isUserAMember) {
      return {
        status: 400,
        message: 'User Is Already A Member',
      };
    }
    if (pRoom.type === RoomType.PRIVATE) {
      const user = await this.prismaService.roomChatConversation.findUnique({
        where: {
          roomChatId_userId: {
            roomChatId: room.name,
            userId: userId,
          },
        },
        select: {
          userStatus: true,
        },
      });
      if (user && user.userStatus === UserStatusGroup.INVITED) {
        await this.prismaService.roomChatConversation.update({
          where: {
            roomChatId_userId: {
              roomChatId: room.name,
              userId: userId,
            },
          },
          data: {
            userStatus: null,
          },
        });
      } else {
        return {
          status: 403,
          message: 'User Is Not Invited',
        };
      }
    } else {
      if (pRoom.type === RoomType.PROTECTED) {
        if (!(await bcrypt.compare(room?.password ?? '', pRoom.password))) {
          return {
            status: 403,
            message: 'Invalid Credentials',
          };
        }
      }
      await this.createNewMember(userId, room.name, UserRole.BASIC);
    }
    return {
      status: 200,
      message: 'User Is Now A Member',
    };
  }

  private async isUserAdmin(userId: string, roomName: string) {
    const res = await this.prismaService.roomChatConversation.findUnique({
      where: {
        roomChatId_userId: {
          roomChatId: roomName,
          userId: userId,
        },
        userRole: UserRole.ADMIN,
      },
    });
    if (res) {
      return true;
    } else {
      return false;
    }
  }

  private async getUserRole(
    userId: string,
    roomName: string,
  ): Promise<UserRole | null> {
    const res = await this.prismaService.roomChatConversation.findUnique({
      where: {
        roomChatId_userId: {
          roomChatId: roomName,
          userId: userId,
        },
      },
      select: {
        userRole: true,
      },
    });
    return res?.userRole ?? null;
  }

  async muteUserInRoom(
    userId: string,
    room: MuteUserInRoomDto,
  ): Promise<Response> {
    try {
      if (!userId) {
        return {
          status: 404,
          message: 'User Was Not Found',
        };
      }
      const pRoom = await this.findRoomByName(room);
      if (!pRoom) {
        return {
          status: 404,
          message: 'Room was not found',
        };
      }
      const userRole = await this.getUserRole(userId, room.name);
      if (userRole != UserRole.ADMIN) {
        return {
          status: 403,
          message: 'User must be admin',
        };
      }
      const isUserAlreadyMuted =
        await this.prismaService.roomChatConversation.findUnique({
          where: {
            roomChatId_userId: {
              roomChatId: room.name,
              userId: room.wannaBeMuted.userId,
            },
          },
          select: {
            userStatus: true,
          },
        });
      if (isUserAlreadyMuted) {
        if (isUserAlreadyMuted.userStatus === UserStatusGroup.MUTED) {
          return {
            status: 400,
            message: 'User already muted',
          };
        }
      } else {
        return {
          status: 400,
          message: 'User Does Not Exist',
        };
      }
      await this.prismaService.roomChatConversation.update({
        where: {
          roomChatId_userId: {
            roomChatId: pRoom.name,
            userId: room.wannaBeMuted.userId,
          },
        },
        data: {
          userStatus: UserStatusGroup.MUTED,
          muteDuration: room.wannaBeMuted.time as MuteDurations,
        },
      });
      return {
        status: 200,
        message: 'User Was Muted',
      };
    } catch (e) {
      this.logger.error(e.message);
      this.logger.error('muteUsersInRoom failed');
      return {
        status: 500,
        message: 'Operation mute is impossible',
      };
    }
  }

  async getAllRooms(userId: string): Promise<Response> {
    try {
      if (!userId) {
        return {
          status: 404,
          message: 'User Was Not Found',
        };
      }
      const res = await this.prismaService.roomChatConversation.findMany({
        where: {
          userId: userId,
        },
        select: {
          Message: {
            orderBy: {
              sentAt: 'desc',
            },
            select: {
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
            take: 1,
          },
          roomChatId: true,
          RoomChat: {
            select: {
              type: true,
            },
          },
        },
      });
      return {
        status: 200,
        message: 'Loading successful',
        data: res ?? [],
      };
    } catch {
      return {
        status: 500,
        message: 'Could not load messages from database',
      };
    }
  }

  async getSpecificRoom(query: PaginationQueryDto, roomId: string) {
    try {
			if (!roomId) {
				return {
					status: 404,
					content: "Room Was Not Found",
				}
			}
      const content = await this.prismaService.message.findMany({
        where: {
          RoomChatConversation: {
            roomChatId: roomId,
          },
        },
        orderBy: {
          sentAt: 'desc',
        },
        skip: query.getSkip(),
        take: query.limit,
        select: {
          message: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
          sentAt: true,
        },
      });
      return {
        status: 200,
        content: serializePaginationResponse(
          content,
          content.length,
          query.limit,
        ),
      };
      // } catch {
      //   return {
      //     status: 500,
      //     content: 'Cannot get individual messages',
      //   };
      // }
    } catch {
      return {
        status: 500,
        content: 'Failed to retrieve messages',
      };
    }
  }
}
