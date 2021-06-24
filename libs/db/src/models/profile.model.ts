import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';

export class Profile {
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
