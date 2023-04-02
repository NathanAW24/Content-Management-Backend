import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';
import { CreateCampaignDto } from './createCampaign.dto';

@InputType()
export class EditUserDto {
  @Length(24)
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: true })
  profileName?: string;

  @Field(() => String, { nullable: true })
  profileUrl?: string;

  @Field(() => [String], { nullable: true })
  roles?: string[];

  @Field(() => Date, { nullable: true })
  modifiedAt?: Date;
}
