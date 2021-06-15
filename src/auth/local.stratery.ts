import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from 'src/interfaces/user.interface';
import { encript } from 'src/utils/encription';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new BadRequestException('用户名不正确');
    }
    const pass = encript(password, user.salt);
    console.log(pass);
    console.log(user.password);

    if (pass !== user.password) {
      throw new BadRequestException('密码不正确');
    }
    return user;
  }
}
