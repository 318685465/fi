import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop()
  @ApiProperty({
    description: '用户昵称',
    example: '老王',
  })
  readonly name: string;

  @Prop()
  @ApiProperty({
    description: '公司',
    example: 'A公司',
  })
  readonly company: string;
}
