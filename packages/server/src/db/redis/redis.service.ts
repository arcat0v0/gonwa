import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;
  private readonly logger = new Logger('RedisService');

  constructor(private configService: ConfigService) {
    const redisHost = this.configService.get('REDIS_HOST');
    const redisPort = this.configService.get('REDIS_PORT');
    if (!redisHost || !redisPort) {
      this.logger.error(
        'Redis host and port must be provided, Redis module will be disabled.',
      );
      return;
    }
    this.redisClient = new Redis({
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
    });
    if (this.redisClient) {
      this.logger.log('Redis connected');
    }
  }

  // 示例方法：设置键值对
  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  // 示例方法：获取键值对
  async get(key: string): Promise<string> {
    return await this.redisClient.get(key);
  }

  // 其他 Redis 操作方法
  async lpush(key: string, value: (string | number | Buffer)[]): Promise<void> {
    await this.redisClient.lpush(key, ...value);
  }

  async lpop(key: string): Promise<string> {
    return await this.redisClient.lpop(key);
  }

  async lrange(key: string, start: number, stop: number): Promise<string[]> {
    return await this.redisClient.lrange(key, start, stop);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async keys(pattern: string): Promise<string[]> {
    return await this.redisClient.keys(pattern);
  }

  async exists(key: string): Promise<number> {
    return await this.redisClient.exists(key);
  }

  async expire(key: string, seconds: number): Promise<void> {
    await this.redisClient.expire(key, seconds);
  }

  async ttl(key: string): Promise<number> {
    return await this.redisClient.ttl(key);
  }

  async flushall(): Promise<void> {
    await this.redisClient.flushall();
  }

  async sadd(key: string, value: (string | number | Buffer)[]): Promise<void> {
    await this.redisClient.sadd(key, value);
  }

  async smembers(key: string): Promise<string[]> {
    return await this.redisClient.smembers(key);
  }

  async scard(key: string): Promise<number> {
    return await this.redisClient.scard(key);
  }

  async srem(key: string, value: (string | number | Buffer)[]): Promise<void> {
    await this.redisClient.srem(key, value);
  }

  async sismember(key: string, value: string): Promise<number> {
    return await this.redisClient.sismember(key, value);
  }
}
