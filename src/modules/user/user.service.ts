import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('USER_MODEL') private readonly userModel:Model<User>){}

  /**
   * @description 通过手机查找用户
   * @date 07/06/2021
   * @private
   * @param {string} phone
   * @return {*}
   * @memberof UserService
   */
  public async findOneByPhone(phone: string){
    return await this.userModel.find({
      phone
    })
  }
}
