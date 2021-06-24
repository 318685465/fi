import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';

export class Project {
  @Prop()
  @ApiProperty({
    description: '项目名称',
    example: '实验小学智慧改造工程',
  })
  readonly name: string;

  @Prop()
  @ApiProperty({
    description: '项目创建日期',
    example: '2021/06/11 23:06:30',
  })
  date: string;

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

  @Prop()
  @ApiProperty({
    description: '项目地址',
    example: '华富路5001号',
  })
  readonly address: string;

  @Prop()
  @ApiProperty({
    description: '阶段',
    example: '施工中',
  })
  readonly stage: string;

  @Prop()
  identify: string;
}
