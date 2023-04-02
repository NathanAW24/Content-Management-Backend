import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CampaignDto } from './campaign.dto';
import { UserDto } from './user.dto';

@ObjectType()
export class ShareObject {
  @Field(() => Number)
  driver?: string;

  @Field(() => Number)
  adswift?: string;

  @Field(() => Number)
  carRental?: string;
}

@ObjectType()
export class ChannelDto {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  channelId: string;

  @Field(() => String)
  channelName: string;

  @Field(() => UserDto, { nullable: true })
  owner?: UserDto;

  @Field(() => String)
  resolution: string;

  @Field(() => String)
  channelType: string;

  @Field(() => [CampaignDto], { nullable: true })
  campaigns?: CampaignDto[];

  @Field(() => String)
  deviceModel: string;

  @Field(() => String, { nullable: true })
  thumbnailUrl?: string;

  @Field(() => ShareObject)
  shares: ShareObject;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  locationDetails?: string;

  @Field(() => Date, { nullable: true })
  modifiedAt?: Date;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;
}
