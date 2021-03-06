import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../interfaces/user.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('用户验证模块')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({
    summary: '用户登录',
  })
  public async userLogin(@Body() userDto: User, @Req() req) {
    return await this.authService.login(req.user);
  }

  @Post('regist')
  @ApiOperation({
    summary: '用户注册',
  })
  async registUser(@Body() userDto: User) {
    // return userDto;
    return await this.authService.regist(userDto);
  }

  @Post('alter')
  @ApiOperation({
    summary: '用户修改接口',
  })
  async alterUser(@Body() userDto: User) {
    return await this.authService.alter(userDto);
  }

  @Get('captcha/:id')
  @ApiOperation({
    summary: '获取注册验证码',
  })
  async getCaptcha(@Param('id') id: string) {
    return await this.authService.createCaptcha(id);
  }

  @Post('captcha')
  @ApiOperation({
    summary: '验证注册验证码',
  })
  async verify(@Body() captcha: { captcha: string; id: string }) {
    console.log(captcha);
    return await this.authService.verification(captcha.captcha, captcha.id);
  }
}
