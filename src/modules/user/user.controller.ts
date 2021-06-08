import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '../role/role.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('用户模块')
// @UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('hello')
  @Role('admin')
  hello() {
    return this.userService.hello();
  }
}
