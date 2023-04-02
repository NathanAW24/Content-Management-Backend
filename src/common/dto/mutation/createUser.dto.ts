import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { CreateCampaignDto } from './createCampaign.dto';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  userSub: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  profileName?: string;

  @Field(() => String, { nullable: true })
  profileUrl?: string;

  @Field(() => [String])
  roles: string[];

  @Field(() => Number, { nullable: true })
  assetStorageUsed?: number;

  @Field(() => [String], { nullable: true })
  campaigns?: string[];

  @Field(() => [String], { nullable: true })
  assets?: string[];
  @Field(() => [String], { nullable: true })
  channels?: string[];

  @Field(() => Date, { nullable: true })
  modifiedAt?: Date;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;
}
