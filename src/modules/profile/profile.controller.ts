import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Profile } from 'src/interfaces/profile.interface';
import { crud, CrudController } from 'src/utils/v';
import { ProfileService } from './profile.service';

@Controller('profile')
@crud({ model: Profile })
@ApiTags('用户中心')
export class ProfileController extends CrudController {
  constructor(private readonly profileService: ProfileService) {
    super(profileService);
  }
}
