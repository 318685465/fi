import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashPasswordMiddleware } from '../../middlewares/hash-password.middleware';
import { DbModule } from '@libs/db';

@Module({
  providers: [UserService, DbModule],
  controllers: [UserController],
})
export class UserModule {}
