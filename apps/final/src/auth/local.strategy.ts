import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from '../interfaces/user.interface';
import { encript } from '../utils/encription';

// @Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
  ) {
    super({
      usernameField: 'phone',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(phone: string, password: string) {
    const user = await this.userModel.findOne({ phone });
    if (!user) {
      throw new BadRequestException('用户名不正确');
    }
    const pass = encript(password, user.salt);

    if (pass !== user.password) {
      throw new BadRequestException('密码不正确');
    }
    return user;
  }
}
