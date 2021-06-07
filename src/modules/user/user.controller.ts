import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {  ApiTags } from '@nestjs/swagger';
import { Role } from '../role/role.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags("用户模块")
export class UserController {
  constructor(private userService: UserService){}

  @Get("hello")
  @Role('admin')
  @UseGuards(AuthGuard('jwt'))
  hello():string{
    return "hello world"
  }
}
