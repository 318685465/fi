import { SchemaFactory } from '@nestjs/mongoose';
import { Profile } from '../../interfaces/profile.interface';

export const ProfileSchema = SchemaFactory.createForClass(Profile);
