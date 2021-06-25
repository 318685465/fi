import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { DbModule } from '@libs/db';

@Module({
  providers: [ProfileService, DbModule],
  controllers: [ProfileController],
})
export class ProfileModule {}
