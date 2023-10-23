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
import { JwtPayload } from 'jsonwebtoken';
import { JwtAuthGuard } from 'src/auth/guards';
import { UserDecorator } from 'src/global/decorators/global.decorators';
import { Response } from 'src/global/interfaces';
import { StorageService } from 'src/storage/storage.service';
import { UserService } from 'src/user/user.service';
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
          fileType: /image\/(jpeg|png|svg)/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5,
          message: (maxSize) =>
            `File size should not exceed ${Math.floor(maxSize / 1000000)}m`,
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
    const path = `media/${user.id + 'spinShot'}.${file.mimetype.split('/')[1]}`;
    
    const ret: Response =  this.storageService.save(path, file.buffer);
    this.userService.updateAvatar(
      user.id,
      this.storageService.getPublicUrl(path),
    );
    return ret;
  }
}
