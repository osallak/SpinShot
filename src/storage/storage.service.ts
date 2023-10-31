import { Storage } from '@google-cloud/storage';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Writable } from 'stream';
import { Response } from '../global/interfaces';
@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: string;
  constructor(private readonly configService: ConfigService) {
    this.storage = new Storage({
      projectId: this.configService.get('GCS_PROJECT_ID'),
      keyFilename: this.configService.get('GCS_KEYFILE_PATH'),
    });

    this.bucket = this.configService.get('GCS_BUCKET_NAME');
  }

  save(path: string, media: Buffer): Response {
    try {
      const file = this.storage.bucket(this.bucket).file(path);
      const stream: Writable = file.createWriteStream({
        resumable: false,
        metadata: {
          cacheControl: 'no-store',
        },
      });
      stream.end(media);
      return {
        status: 201,
        message: 'File uploaded successfully',
      };
    } catch (e) {
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
    } catch (error) {
      throw new InternalServerErrorException('failed to make file public');
    }
  }
}
