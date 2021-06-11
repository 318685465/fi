import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from 'src/interfaces/profile.interface';
import { CrudService } from 'src/utils/v';

@Injectable()
export class ProfileService extends CrudService {
  constructor(
    @InjectModel('PROFILE_MODEL') private readonly profileModel: Model<Profile>,
  ) {
    super(profileModel);
  }
}
