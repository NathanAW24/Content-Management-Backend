import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class FindByIdDto {
  @Length(24)
  @Field(() => ID)
  _id?: string;
}
