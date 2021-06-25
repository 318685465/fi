import { Profile } from '@libs/db/models/profile.model';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
// import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
// import { Profile } from '../../interfaces/profile.interface';
import { CrudService } from '../../utils/v';

@Injectable()
export class ProfileService extends CrudService {
  constructor(
    @InjectModel(Profile)
    private readonly profileModel: ReturnModelType<typeof Profile>,
  ) {
    super(profileModel);
  }
}
