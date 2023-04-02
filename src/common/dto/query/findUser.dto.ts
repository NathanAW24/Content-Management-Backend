import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, Length } from 'class-validator';

@InputType()
export class FindUserDto {
  @Length(24)
  @IsOptional()
  @Field(() => ID, { nullable: true })
  _id?: string;

  @IsEmail()
  @IsOptional()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  userSub?: string;
}
