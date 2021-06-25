import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { IUserProject } from '../../interfaces/user.interface';
import * as Redis from 'ioredis';
import { User } from '@libs/db/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UserService {
  private redis: Redis.Redis;
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
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

  public async findOneById(id: string) {
    return await this.userModel.findById(id);
  }

  public async addUserProject(projectId: string, userid) {
    const user: User = await this.findOneById(userid);
    const userProject: IUserProject = {
      projectId,
      identify: '项目经理',
    };
    user.projects.push(userProject);
    await this.userModel.findByIdAndUpdate(userid, user);
  }
}
