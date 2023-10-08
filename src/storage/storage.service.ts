import { Storage } from '@google-cloud/storage';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Writable } from 'stream';
import { Response } from '../global/interfaces';
@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: string;
  private logger: LoggerService;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger('StorageService');
    this.storage = new Storage({
      projectId: this.configService.get('GCS_PROJECT_ID'),
      keyFilename: this.configService.get('GCS_KEYFILE_PATH'),
    });

    this.bucket = this.configService.get('GCS_BUCKET_NAME');
  }

  save(path: string, media: Buffer): Response {
    try {
      const file = this.storage.bucket(this.bucket).file(path);
      const stream: Writable = file.createWriteStream();
      stream.end(media);
      return {
        status: 201,
        message: 'File uploaded successfully',
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new InternalServerErrorException('Failed to upload file');
    }
  }

  async delete(path: string): Promise<void> {
    try {
      await this.storage
        .bucket(this.bucket)
        .file(path)
        .delete({ ignoreNotFound: true });
    } catch (e) {
      this.logger.error(e.message);
      throw new InternalServerErrorException('Failed to delete file');
    }
  }

  getPublicUrl(path: string): string {
    const file = this.storage.bucket(this.bucket).file(path);
    return file.publicUrl();
  }

  async makePublic(path: string): Promise<void> {
    try {
      const file = this.storage.bucket(this.bucket).file(path);
      await file.makePublic();
    } catch(error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException('failed to make file public');
    }
  }
}
