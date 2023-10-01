import {
  Controller,
  HttpException,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from 'src/storage/storage.service';
import { UserService } from 'src/user/user.service';
import { Response } from 'src/global/interfaces';
import { JwtAuthGuard } from 'src/auth/guards';
import { UserDecorator } from 'src/global/decorators/global.decorators';
import { JwtPayload } from 'jsonwebtoken';
import { MediaDoc } from './swagger/media.swagger';

@Controller('media')
export class MediaController {
  constructor(
    private readonly userService: UserService,
    private readonly storageService: StorageService,
  ) {}

  @MediaDoc()
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
    const path = `media/${user.id}.${file.mimetype.split('/')[1]}`;
    const ret: Response = this.storageService.save(path, file.buffer);
    this.userService.updateAvatar(
      user.sub,
      this.storageService.getPublicUrl(path),
    );
    return ret;
  }
}
