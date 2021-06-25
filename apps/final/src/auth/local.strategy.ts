import { User } from '@libs/db/models/user.model';
import { BadRequestException, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { Model } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { IStrategyOptions, Strategy } from 'passport-local';
// import { User } from '../interfaces/user.interface';
import { encript } from '../utils/encription';

// @Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
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
