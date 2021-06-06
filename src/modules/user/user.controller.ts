import { Body, Controller, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../interfaces/user.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { Role } from '../role/role.decorator';

@Controller('user')
@ApiTags("用户模块")
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService){}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Post('regist')
  @ApiOperation({
    summary: "用户注册"
  })
  async registUser(@Body() userDto: User){
    return await this.userService.regist(userDto);
  }

  @Get("hello")
  @Role('admin')
  hello():string{
    return "hello world"
  }
}
