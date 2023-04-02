import { Field, InputType } from '@nestjs/graphql';
import { ShareObject } from '../channel.dto';

@InputType()
export class ShareInput {
  @Field(() => Number)
  driver?: string;

  @Field(() => Number)
  adswift?: string;

  @Field(() => Number)
  carRental?: string;
}

@InputType()
export class CreateChannelDto {
  @Field(() => String)
  channelName: string;

  @Field(() => String)
  channelId: string;

  @Field(() => String, { nullable: true })
  owner?: string;

  @Field(() => String)
  resolution: string;

  @Field(() => String)
  deviceCredentials: string;

  @Field(() => String)
  channelType: string;

  @Field(() => [String], { nullable: true })
  campaigns?: string[];

  @Field(() => String, { nullable: true })
  thumbnailUrl?: string;

  @Field(() => ShareInput, { nullable: true })
  shares?: ShareInput;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  locationDetails?: string;

  @Field(() => Date, { nullable: true })
  modifiedAt?: Date;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;
}
