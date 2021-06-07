import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../interfaces/user.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("用户验证模块")
export class AuthController {
  constructor(private readonly authService: AuthService){}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Post('login')
  @ApiOperation({
    summary: "用户登录"
  })
  public async userLogin(@Body() userDto:User){
    return await this.authService.login(userDto);
  }

  @Post('regist')
  @ApiOperation({
    summary: "用户注册"
  })
  async registUser(@Body() userDto: User){
    return await this.authService.regist(userDto);
  }
}
