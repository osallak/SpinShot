import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dtos/create-room.dto';
import { JoinRoomDto } from './dtos/join-room.dto';
import {
  FriendshipStatus,
  RoomType,
  User,
  UserRole,
  UserStatusGroup,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Response, toObject } from 'src/global/interfaces';
import { Room } from './dtos/find-room.dto';
import { UserService } from 'src/user/user.service';
import { MuteUserInRoomDto } from './dtos/mute-user-in-room.dto';
import { PaginationQueryDto } from 'src/global/dto/pagination-query.dto';
import { serializePaginationResponse } from 'src/user/helpers';
import { async, elementAt } from 'rxjs';
import { boolean, valid } from 'joi';
import { join, resolve } from 'path';
import { rejects } from 'assert';
import { banUserDto } from './dtos/ban-user.dto';
import { ProtectRoomDto } from './dtos/protect-room.dto';
import { ElevateUserDto } from './dtos/elevate-user.dto';

@Injectable()
export class RoomService {
  private readonly logger: Logger = new Logger('room');
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async findRoomByName(
    body: JoinRoomDto | CreateRoomDto | MuteUserInRoomDto | banUserDto,
    prismaService: PrismaService,
  ): Promise<any | null> {
    return new Promise(async (resolve, reject) => {
      try {
        if (body instanceof CreateRoomDto) {
          for (let e in RoomType) {
            const room = await prismaService.roomChat.findUnique({
              where: {
                id: body.name,
                type: e as RoomType,
              },
            });
            if (room) {
              resolve(room);
              return;
            }
          }
          resolve(null);
        } else {
          const room = await prismaService.roomChat.findUnique({
            where: {
              id: body.name,
              type: body.type,
            },
          });
          if (room) {
            resolve(room);
          } else {
            resolve(null);
          }
        }
      } catch (e) {
        reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }
  async createRoom(
    roomName: string,
    type: RoomType,
    prismaService: PrismaService,
    pass?: string,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        let password = null;
        if (type === RoomType.PROTECTED) {
          password = await bcrypt.hash(pass, 10);
        }
        await prismaService.roomChat.create({
          data: {
            id: roomName,
            type: type,
            password: password,
          },
        });
        resolve(null);
      } catch (e) {
        console.log(e);
        reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }

  async createMember(
    userId: string,
    userRole: UserRole,
    roomName: string,
    prismaService: PrismaService,
  ): Promise<any | null> {
    return new Promise(async (resolve, reject) => {
      try {
        await prismaService.roomChatConversation.create({
          data: {
            User: {
              connect: {
                id: userId,
              },
            },
            RoomChat: {
              connect: {
                id: roomName,
              },
            },
            userRole: userRole,
          },
        });
        resolve(null);
      } catch (e) {
        console.log(e);
        reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }

  async addRoom(
    userId: string,
    createRoomDto: CreateRoomDto,
  ): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        const room = await this.findRoomByName(
          createRoomDto,
          this.prismaService,
        );
        if (room) {
          resolve({
            status: 400,
            message: 'Room Exists',
          });
          return;
        }
        await this.createRoom(
          createRoomDto.name,
          createRoomDto.type,
          this.prismaService,
          createRoomDto?.password,
        );
        await this.createMember(
          userId,
          UserRole.OWNER,
          createRoomDto.name,
          this.prismaService,
        );
        resolve({
          status: 201,
          message: 'Room Addedd',
        });
      } catch (e) {
        reject({
          status: e?.status,
          message: e?.message,
        });
      }
    });
  }

  async joinRoom(userId: string, joinRoomDto: JoinRoomDto): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        const room = await this.findRoomByName(joinRoomDto, this.prismaService);
        if (!room) {
          resolve({
            status: 404,
            message: 'Room Does Not Exist',
          });
          return;
        }
        const user = await this.prismaService.roomChatConversation.findUnique({
          where: {
            roomChatId_userId: {
              roomChatId: joinRoomDto.name,
              userId: userId,
            },
          },
        });
        if (user && user.userStatus === UserStatusGroup.BANNED) {
          resolve({
            status: 403,
            message: 'User Is Banned',
          });
          return;
        }
        if (
          joinRoomDto.type === RoomType.PUBLIC ||
          joinRoomDto.type === RoomType.PROTECTED
        ) {
          if (user) {
            resolve({
              status: 400,
              message: 'User Already Member',
            });
            return;
          }
          if (joinRoomDto.type === RoomType.PROTECTED) {
            const isEqual = await bcrypt.compare(
              joinRoomDto?.password ?? '',
              room.password,
            );
            if (!isEqual) {
              resolve({
                status: 403,
                message: 'Invalid Credentials',
              });
              return;
            }
          }
        } else if (joinRoomDto.type === RoomType.PRIVATE) {
          if (!user || user?.userStatus !== UserStatusGroup.INVITED) {
            resolve({
              status: 400,
              message: 'User Is Not Invited',
            });
            return;
          }
        }
        if (user) {
          await this.prismaService.roomChatConversation.update({
            where: {
              roomChatId_userId: {
                roomChatId: joinRoomDto.name,
                userId: userId,
              },
            },
            data: {
              userStatus: null,
            },
          });
        } else {
          await this.prismaService.roomChatConversation.create({
            data: {
              RoomChat: {
                connect: {
                  id: joinRoomDto.name,
                },
              },
              User: {
                connect: {
                  id: userId,
                },
              },
              userRole: UserRole.BASIC,
            },
          });
        }
        resolve({
          status: 200,
          message: 'Joined Successfully',
        });
      } catch (e) {
        console.log(e);
        reject({
          status: e?.status,
          message: e?.message,
        });
      }
    });
  }

  async updateUserGroupStatus(
    userId: string,
    roomName: string,
    userStatusGroup: UserStatusGroup,
    prismaService: PrismaService,
    muteDurations?: string,
    mutedAt?: string,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const room = await prismaService.roomChat.findUnique({
          where: {
            id: roomName,
          },
        });
        if (!room) {
          resolve({
            status: 404,
            message: 'Room Does Not Exist',
          });
          return;
        }
        const user = await prismaService.roomChatConversation.findUnique({
          where: {
            roomChatId_userId: {
              roomChatId: roomName,
              userId: userId,
            },
          },
        });
        if (!user) {
          resolve({
            status: 404,
            message: 'User Is Not A Member',
          });
          return;
        }
        if (user.userRole === UserRole.OWNER) {
          resolve({
            status: 403,
            message: 'Cannot Operate On Owner',
          });
          return;
        }
        if (
          userStatusGroup === UserStatusGroup.BANNED &&
          user.userStatus === UserStatusGroup.BANNED
        ) {
          reject({
            status: 403,
            message: 'User Already Banned',
          });
          return;
        }
        await prismaService.roomChatConversation.update({
          where: {
            roomChatId_userId: {
              roomChatId: roomName,
              userId: userId,
            },
          },
          data: {
            userStatus: userStatusGroup,
            muteDuration: muteDurations ?? null,
            mutedAt: mutedAt ?? null,
          },
        });
        resolve({
          status: 200,
          message: 'User Group Status Updated',
        });
      } catch (e) {
        console.log(e);
        reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }

  private async isUserPrivileged(
    userId: string,
    roomName: string,
    prismaService: PrismaService,
  ): Promise<null | boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await prismaService.roomChatConversation.findUnique({
          where: {
            roomChatId_userId: {
              roomChatId: roomName,
              userId: userId,
            },
          },
        });
        if (!user) {
          reject(null);
          return;
        }
        if (user.userRole === UserRole.BASIC) {
          resolve(false);
        } else {
          resolve(true);
        }
      } catch (e) {
        console.log(e);
        resolve(null);
      }
    });
  }

  async banUserFromRoom(admin: string, info: banUserDto): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        const room = this.findRoomByName(info, this.prismaService);
        if (!room) {
          reject({
            status: 404,
            message: 'Room Not Found',
          });
          return;
        }
        const isUserAdmin = await this.isUserPrivileged(
          admin,
          info.name,
          this.prismaService,
        );
        if (!isUserAdmin) {
          reject({
            status: 403,
            message: 'Cannot Ban',
          });
          return;
        }
        await this.updateUserGroupStatus(
          info.userToBeBanned,
          info.name,
          UserStatusGroup.BANNED,
          this.prismaService,
        );
        resolve({
          status: 200,
          message: 'User Was Banned',
        });
      } catch (e) {
        reject(e as Response);
      }
    });
  }

  async muteUserInRoom(
    userId: string,
    muteUserInRoomDto: MuteUserInRoomDto,
  ): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        const room = this.findRoomByName(muteUserInRoomDto, this.prismaService);
        if (!room) {
          reject({
            status: 404,
            message: 'Room Not Found',
          });
          return;
        }
        const isUserAdmin = await this.isUserPrivileged(
          userId,
          muteUserInRoomDto.name,
          this.prismaService,
        );
        if (!isUserAdmin) {
          reject({
            status: 403,
            message: 'Cannot Ban',
          });
          return;
        }
        const res = await this.updateUserGroupStatus(
          muteUserInRoomDto.wannaBeMuted.userId,
          muteUserInRoomDto.name,
          UserStatusGroup.MUTED,
          this.prismaService,
          muteUserInRoomDto.wannaBeMuted.time,
          muteUserInRoomDto.wannaBeMuted.mutedAt,
        );
        resolve(res as Response);
      } catch (e) {
        console.log(e);
        reject(e as Response);
      }
    });
  }

  async getAllRooms(userId: string): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        const rooms = await this.prismaService.roomChat.findMany({
          where: {
            RoomChatConversation: {
              some: {
                userId: userId,
              },
            },
          },
          select: {
            id: true,
            type: true,
            messages: {
              select: {
                message: true,
                user: {
                  select: {
                    id: true,
                    username: true,
                    avatar: true,
                  },
                },
                sentAt: true,
              },
              orderBy: {
                sentAt: 'desc',
              },
              take: 1,
            },
          },
        });
        resolve({
          status: 200,
          message: 'All Rooms',
          data: rooms,
        });
      } catch (e) {
        console.log(e);
        reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }

  async getSpecificRoom(
    query: PaginationQueryDto,
    roomName: string,
    userId: string,
  ): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        // sending back a array of blocked users
        let blockedUsersRes = [];
        const blockedUsers = await this.prismaService.friendship.findMany({
          select: {
            leftUserId: true,
            rightUserId: true,
          },
          where: {
            OR: [
              {
                leftUserId: userId,
              },
              {
                rightUserId: userId,
              },
            ],
            status: FriendshipStatus.BLOCKED,
          },
        });
        blockedUsers.forEach((e) => {
          if (e.leftUserId === userId) {
            blockedUsersRes.push(e.rightUserId);
          } else {
            blockedUsersRes.push(e.leftUserId);
          }
        });

        const messages = await this.prismaService.roomChat.findMany({
          where: {
            id: roomName,
          },
          select: {
            messages: {
              skip: query.getSkip(),
              take: query.limit,
              orderBy: {
                sentAt: 'desc',
              },
              select: {
                message: true,
                sentAt: true,
                user: {
                  select: {
                    id: true,
                    username: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        });
        resolve({
          status: 200,
          message: 'Single Room',
          data: {
            blockedUsers: blockedUsersRes,
            messages: toObject.call(messages),
          },
        });
      } catch (e) {
        console.log(e);
      }
    });
  }

  async kickUserFromRoom(
    admin: string,
    roomName: string,
    userToBeKicked: string,
  ): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        const room = await this.prismaService.roomChatConversation.findMany({
          where: {
            roomChatId: roomName,
            OR: [
              {
                userId: admin,
              },
              {
                userId: userToBeKicked,
              },
            ],
          },
        });

        if (!room || room.length !== 2) {
          reject({
            status: 404,
            message: 'No Room Meet The Criterion',
          });
          return;
        }
        const isUserAdmin = await this.isUserPrivileged(
          admin,
          roomName,
          this.prismaService,
        );
        if (!isUserAdmin) {
          reject({
            status: 403,
            message: 'Unprivileged User Trying to Kick',
          });
          return;
        }

        const isOwner =
          await this.prismaService.roomChatConversation.findUnique({
            where: {
              roomChatId_userId: {
                roomChatId: roomName,
                userId: userToBeKicked,
              },
            },
          });
        if (isOwner && isOwner.userRole === UserRole.OWNER) {
          reject({
            status: 403,
            message: 'Cannot Kick Owner',
          });
          return;
        }

        await this.prismaService.roomChatConversation.delete({
          where: {
            roomChatId_userId: {
              roomChatId: roomName,
              userId: userToBeKicked,
            },
          },
        });

        resolve({
          status: 200,
          message: 'User Kicked Successfully',
        });
      } catch (e) {
        console.log(e);
        reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }

  async protectRoom(
    admin: string,
    protectRoomDto: ProtectRoomDto,
  ): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        const room = await this.prismaService.roomChatConversation.findUnique({
          where: {
            roomChatId_userId: {
              roomChatId: protectRoomDto.room,
              userId: admin,
            },
          },
          select: {
            userRole: true,
            RoomChat: {
              select: {
                type: true,
              },
            },
          },
        });
        if (!room || (room && room.RoomChat.type !== RoomType.PUBLIC)) {
          reject({
            status: 403,
            message: 'Cannot Protect Room',
          });
          return;
        }
        if (room.userRole === UserRole.BASIC) {
          reject({
            status: 403,
            message: 'Unprivileged User Trying to Protect Room',
          });
          return;
        }
        const hashedPassword = await bcrypt.hash(protectRoomDto.password, 10);
        await this.prismaService.roomChat.update({
          where: {
            id: protectRoomDto.room,
          },
          data: {
            type: RoomType.PROTECTED,
            password: hashedPassword,
          },
        });
        resolve({
          status: 200,
          message: 'Room Protected',
        });
      } catch (e) {
        console.log(e);
        reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }

  async makeUserAdmin(
    userId: string,
    elevateUserDto: ElevateUserDto,
  ): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        const room = await this.prismaService.roomChatConversation.findUnique({
          where: {
            roomChatId_userId: {
              roomChatId: elevateUserDto.room,
              userId: elevateUserDto.user,
            },
          },
          select: {
            userRole: true,
          },
        });
        if (!room || (room && room.userRole !== UserRole.BASIC)) {
          reject({
            status: 403,
            message: 'User Cannot Be Elevated',
          });
          return;
        }
        const isAdmin = await this.isUserPrivileged(
          userId,
          elevateUserDto.room,
          this.prismaService,
        );
        if (!isAdmin) {
          reject({
            status: 403,
            message: 'Unprivileged User Trying to Elevate',
          });
          return;
        }

        await this.prismaService.roomChatConversation.update({
          where: {
            roomChatId_userId: {
              roomChatId: elevateUserDto.room,
              userId: elevateUserDto.user,
            },
          },
          data: {
            userRole: UserRole.ADMIN,
          },
        });

        resolve({
          status: 200,
          message: 'User Elevated',
        });
      } catch (e) {
        console.log(e);
        reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }

  async getRoomMembers(roomName: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const roomMembers =
          await this.prismaService.roomChatConversation.findMany({
            where: {
              roomChatId: roomName,
              OR: [
                {
                  userStatus: null,
                },
                {
                  userStatus: UserStatusGroup.MUTED,
                },
              ],
            },
            select: {
              userId: true,
              userStatus: true,
							muteDuration: true,
							mutedAt: true,
            },
          });
        resolve(roomMembers);
      } catch (e) {
        console.log(e);
        reject([]);
      }
    });
  }

  async getAllAvailableRooms(): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        const rooms = await this.prismaService.roomChat.findMany({
          select: {
            id: true,
            type: true,
          },
        });
        return resolve({
          status: 200,
          message: 'All Rooms',
          data: rooms,
        });
      } catch {
        return reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }

  async deleteRoom(userId: string, roomName: string): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!userId || !roomName) {
          return reject({
            status: 400,
            message: 'userId and roomName are required',
          });
        }
        const user = await this.prismaService.roomChatConversation.findUnique({
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
        if (!user) {
          return reject({
            status: 404,
            message: 'User Not A Member',
          });
        }
        if (user.userRole !== UserRole.OWNER) {
          return reject({
            status: 403,
            message: 'Unprivileged User Trying to Delete Room',
          });
        }
        await this.prismaService.roomChat.delete({
          where: {
            id: roomName,
          },
        });
        return resolve({
          status: 200,
          message: 'Room Deleted',
        });
      } catch (e) {
        console.log(e);
        return reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }

  async inviteUser(
    admin: string,
    userId: string,
    roomName: string,
  ): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!userId || !roomName || !admin) {
          return reject({
            status: 400,
            message: 'Missing values',
          });
        }
        const u = await this.prismaService.roomChatConversation.findUnique({
          where: {
            roomChatId_userId: {
              roomChatId: roomName,
              userId: admin,
            },
          },
          select: {
            userRole: true,
            RoomChat: {
              select: {
                type: true,
              },
            },
          },
        });
        if (!u) {
          return reject({
            status: 404,
            message: 'User Not A Member',
          });
        }
        if (
          u.userRole === UserRole.BASIC ||
          u.RoomChat.type !== RoomType.PRIVATE
        ) {
          return reject({
            status: 403,
            message:
              'Either the room is not private or the user is not privileged',
          });
        }
        const uu = await this.prismaService.roomChatConversation.findUnique({
          where: {
            roomChatId_userId: {
              roomChatId: roomName,
              userId: userId,
            },
          },
        });
        if (uu) {
          return reject({
            status: 400,
            message: 'User Already Member',
          });
        }
        await this.prismaService.roomChatConversation.create({
          data: {
            User: {
              connect: {
                id: userId,
              },
            },
            userRole: UserRole.BASIC,
            userStatus: UserStatusGroup.INVITED,
            RoomChat: {
              connect: {
                id: roomName,
              },
            },
          },
        });
        return resolve({
          status: 200,
          message: 'User Invited',
        });
      } catch (e) {
        console.log(e);
        return reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }

  async leaveRoom(userId: string, roomName: string): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!userId || !roomName) {
          return reject({
            status: 400,
            message: 'Missing values',
          });
        }

        const user = await this.prismaService.roomChatConversation.findUnique({
          where: {
            roomChatId_userId: {
              roomChatId: roomName,
              userId: userId,
            },
            OR: [
              {
                userStatus: null,
              },
              {
                userStatus: UserStatusGroup.MUTED,
              },
            ],
          },
          select: {
            userRole: true,
          },
        });
        if (!user) {
          return reject({
            status: 404,
            message: 'User Not A Member',
          });
        }
        if (user.userRole === UserRole.OWNER) {
          const admins = await this.prismaService.roomChatConversation.findMany(
            {
              where: {
                roomChatId: roomName,
                userRole: UserRole.ADMIN,
                OR: [
                  {
                    userStatus: null,
                  },
                  {
                    userStatus: UserStatusGroup.MUTED,
                  },
                ],
              },
            },
          );
          if (!admins || admins.length === 0) {
            const basicMembers =
              await this.prismaService.roomChatConversation.findMany({
                where: {
                  roomChatId: roomName,
                  userRole: UserRole.BASIC,
                  OR: [
                    {
                      userStatus: null,
                    },
                    {
                      userStatus: UserStatusGroup.MUTED,
                    },
                  ],
                },
                select: {
                  userId: true,
                },
              });
            if (!basicMembers || basicMembers.length === 0) {
              await this.prismaService.roomChat.delete({
                where: {
                  id: roomName,
                },
              });
            } else {
              const newOwner = basicMembers[0].userId;
              await this.prismaService.roomChatConversation.update({
                where: {
                  roomChatId_userId: {
                    roomChatId: roomName,
                    userId: newOwner,
                  },
                },
                data: {
                  userRole: UserRole.OWNER,
                },
              });
            }
          } else {
            const newOwner = admins[0].userId;
            await this.prismaService.roomChatConversation.update({
              where: {
                roomChatId_userId: {
                  roomChatId: roomName,
                  userId: newOwner,
                },
              },
              data: {
                userRole: UserRole.OWNER,
              },
            });
          }
        } else {
        await this.prismaService.roomChatConversation.delete({
          where: {
            roomChatId_userId: {
              roomChatId: roomName,
              userId: userId,
            },
          },
        });
				}
        return resolve({
          status: 200,
          message: 'User Left',
        });
      } catch (e) {
        return reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }
}
