import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Project extends Document {
  @Prop()
  @ApiProperty({
    description: '项目名称',
    example: '实验小学智慧改造工程',
  })
  readonly name: string;

  @Prop()
  @ApiProperty({
    description: '项目简介',
    example: '实验小学简介',
  })
  readonly description: string;

  @Prop()
  @ApiProperty({
    description: '创建者id',
    example: '123',
  })
  readonly creatorId: string;
}
