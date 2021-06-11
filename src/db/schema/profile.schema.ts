import { SchemaFactory } from '@nestjs/mongoose';
import { Profile } from 'src/interfaces/profile.interface';

export const ProfileSchema = SchemaFactory.createForClass(Profile);
