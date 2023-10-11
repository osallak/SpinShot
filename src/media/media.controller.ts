import {
  Controller,
  HttpException,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from 'src/storage/storage.service';
import { UserService } from 'src/user/user.service';
import { Response } from 'src/global/interfaces';
import { JwtAuthGuard } from 'src/auth/guards';
import {
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { UserDecorator } from 'src/global/decorators/global.decorators';
import { JwtPayload } from 'jsonwebtoken';
import { JwtTwoFactorGuard } from 'src/auth/guards/jwt-2fa.guard';

@Controller('media')
export class MediaController {
  constructor(
    private readonly userService: UserService,
    private readonly storageService: StorageService,
  ) {}

  @ApiBearerAuth()
  @ApiTags('user')
  @ApiResponse({ status: 200, description: 'File uploaded successfully' })
  @ApiBadRequestResponse({
    description:
      'File size should not exceed 5m and should be of type jpeg or png',
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /image\/(jpeg|png)/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5, //todo: discuss this (5mb)
          message: (maxSize) =>
            `File size should not exceed ${Math.floor(maxSize / 1000000)}m`, //todo: remove magic number
        })
        .build({
          exceptionFactory(error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          },
        }),
    )
    file: Express.Multer.File,
    @UserDecorator() user: JwtPayload,
  ): Promise<Response> {
    const path = `media/${user.id}.${
      file.mimetype.split('/')[1]
    }`;
    const ret: Response = this.storageService.save(path, file.buffer);
    this.userService.updateAvatar(
      user.sub,
      this.storageService.getPublicUrl(path),
    );
    return ret;
  }
}
