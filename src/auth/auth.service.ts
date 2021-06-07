import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { User } from '../interfaces/user.interface';
import { encript } from '../utils/encription';
import { IResponse } from 'src/interfaces/response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const logger = new Logger('auth.service');

@Injectable()
export class AuthService {
  private response:IResponse;
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel:Model<User>,
    private readonly userService: UserService){}

  /**
   * @description 用户登录验证
   * @date 07/06/2021
   * @private
   * @param {User} user
   * @memberof AuthService
   */
  private async validateUser(user: User){
    const phone: string = user.phone;
    const password: string = user.password;
    return this.userService.findOneByPhone(phone)
      .then(res => {
        if(res.length === 0){
          this.response = {
            code: 3,
            msg: "用户尚未注册！"
          }
          throw this.response;
        }
        return res[0]
      })
      .then((dbUser:User) => {
        const pass = encript(password, dbUser.salt);
        if(pass === dbUser.password){
          return this.response= {
            code: 0,
            msg:{userid: dbUser._id}
          }
        }else{
          this.response = {code: 4, msg: "用户名密码错误！"}
          throw this.response;
        }
      })
      .catch(err => {
        return err;
      })
  }

  /**
   * @description 用户登录方法
   * @date 07/06/2021
   * @param {User} user
   * @return {*}
   * @memberof AuthService
   */
  public async login(user: User){
    return await this.validateUser(user)
      .then(async (res:IResponse) => {
        if(res.code != 0){
          this.response = res
          throw this.response;
        }
        const userid = res.msg.userid
        this.response = {
          code: 0,
          msg: {token: await this.createToken(user),userid}
        }
        return this.response;
      })
      .catch(err => {
        return err;
      })
  }

  /**
   * @description 用户注册方法
   * @date 07/06/2021
   * @param {User} user
   * @return {*} 
   * @memberof AuthService
   */
  public async regist(user: User) {
    return this.userService.findOneByPhone(user.phone)
    .then(res => {
      if(res.length !== 0){
        this.response = {
          code: 1,
          msg: "当前手机号已注册！"
        }
        throw this.response;
      }
    })
    .then(async () => {
      try {
        const createUser = new this.userModel(user)
        await createUser.save()
        this.response = {
          code: 0,
          msg: "用户注册成功！"
        }
        return this.response;
      } catch (error) {
        this.response = {
          code: 2,
          msg: "用户注册失败，请联系相关负责人。错误详情：" + error
        }
        throw this.response;
      }
    }).catch(err => {
      logger.log(`${user.phone}：${err.msg}`);
    })
  }

  /**
   * @description 创建token
   * @date 08/06/2021
   * @private
   * @param {User} user
   * @return {*} 
   * @memberof AuthService
   */
  private async createToken(user:User){
    return this.jwtServe.sign(user);
  }
}
