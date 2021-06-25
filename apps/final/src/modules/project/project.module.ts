import { DbModule } from '@libs/db';
import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, DbModule, UserService],
})
export class ProjectModule {}
