import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class getChannelRevenueDto {
  @Field(() => ID)
  channelId: string;

  @Field(() => Date)
  startTime: Date;

  @Field(() => Date)
  endTime: Date;

  @Field(() => String)
  for: 'driver' | 'adswift' | 'carRental';
}
