import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class getCampaignForChannelDto {
  @Field(() => ID)
  channelId: string;

  @Field(() => Date)
  startTime: Date;

  @Field(() => Date)
  endTime: Date;
}
