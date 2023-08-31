import { Injectable } from '@nestjs/common';
import { InjectRedis, DEFAULT_REDIS_NAMESPACE } from '@songkeys/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async setUserSocket(userId: string, socketId: string): Promise<void> {
    await this.redis.hset('users', userId, socketId);
  }

  async getUserSockets(userId: string): Promise<String[]> {
    return await this.redis.hvals(userId);
  }

  async deleteUserSocket(userId: string, socketId: string): Promise<number> {
    const deleted = await this.redis.hdel('users', userId, socketId);
    return deleted;
  }

  async getAllUsers(): Promise<Record<string, string>> {
    const users = await this.redis.hgetall('users');
    return users;
  }
}
