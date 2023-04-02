import { Field, ID, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { ShareInput } from './createChannel.dto';

@InputType()
export class EditChannelDto {
  @Length(24)
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  channelId: string;

  @Field(() => String, { nullable: true })
  channelName?: string;

  @Field(() => String, { nullable: true })
  owner?: string;

  @Field(() => String, { nullable: true })
  resolution?: string;

  @Field(() => String, { nullable: true })
  deviceCredentials?: string;

  @Field(() => String, { nullable: true })
  channelType?: string;

  @Field(() => [String], { nullable: true })
  campaigns?: string[];

  @Field(() => String, { nullable: true })
  thumbnailUrl?: string;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => ShareInput, { nullable: true })
  shares?: ShareInput;

  @Field(() => String, { nullable: true })
  locationDetails?: string;

  @Field(() => Date, { nullable: true })
  modifiedAt?: Date;
}
