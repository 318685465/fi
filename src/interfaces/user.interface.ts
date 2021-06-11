import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export interface IUserProject {
  projectId: string;
  identify: string;
}

@Schema()
export class User extends Document {
  @Prop()
  @ApiProperty({
    description: '用户手机',
    example: '18900000000',
  })
  readonly phone: string;

  @Prop()
  @ApiProperty({
    description: '用户密码',
    example: '123456',
  })
  readonly password: string;

  @Prop()
  // @ApiProperty({
  //   description: '用户项目id',
  //   example: '123',
  // })
  readonly projects?: Array<IUserProject>;

  @Prop()
  readonly salt?: string;
}
