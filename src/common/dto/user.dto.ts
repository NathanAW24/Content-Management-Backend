import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { AssetDto } from './asset.dto';
import { CampaignDto } from './campaign.dto';
import { ChannelDto } from './channel.dto';

@ObjectType()
export class UserDto {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { description: 'username' })
  userSub: string;

  @Field(() => String, { description: 'email' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'profilename' })
  profileName: string;

  @Field(() => String, { description: 'profileUrl' })
  profileUrl: string;

  @Field(() => [String], { description: 'roles' })
  roles: string[];

  @Field(() => Number, { description: 'assetId' })
  assetStorageUsed: number;

  @Field(() => [CampaignDto])
  campaigns: CampaignDto[];

  @Field(() => [AssetDto])
  assets: AssetDto[];

  @Field(() => [ChannelDto])
  channels: ChannelDto[];

  @Field(() => Date, { nullable: true })
  modifiedAt?: Date;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;
}
