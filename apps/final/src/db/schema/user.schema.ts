import { SchemaFactory } from "@nestjs/mongoose";
import { User } from '../../interfaces/user.interface';

export const UserSchema = SchemaFactory.createForClass(User)