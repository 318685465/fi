import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisService } from 'nestjs-redis';
import { User } from '../../interfaces/user.interface';
import * as Redis from 'ioredis';

@Injectable()
export class UserService {
  private redis: Redis.Redis;
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
    private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.getClient('management');
  }

  /**
   * @description 通过手机查找用户
   * @date 07/06/2021
   * @private
   * @param {string} phone
   * @return {*}
   * @memberof UserService
   */
  public async findOneByPhone(phone: string) {
    return await this.userModel.find({
      phone,
    });
  }

  public async hello() {
    return {
      code: 0,
      msg: 'hello world',
    };
  }
}
