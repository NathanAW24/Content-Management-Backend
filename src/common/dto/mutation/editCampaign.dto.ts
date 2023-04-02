import { Field, ID, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { AssetDto } from '../asset.dto';
import { UserDto } from '../user.dto';
import { CreateUserDto } from './createUser.dto';

@InputType()
export class EditCampaignDto {
  @Length(24)
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: true })
  campaignName?: string;

  @Field(() => [String], { nullable: true })
  assets?: string[];

  @Field(() => String, { nullable: true })
  status?:
    | 'DRAFT'
    | 'PROPOSED'
    | 'REJECTED_NEED_REVISION'
    | 'APPROVED_PENDING_PAYMENT'
    | 'WAITING_DEPLOYMENT'
    | 'DEPLOYED'
    | 'ERROR';

  @Field(() => Number, { nullable: true })
  totalDuration?: number;

  @Field(() => [String], { nullable: true })
  preferences?: string[];

  @Field(() => Date, { nullable: true })
  modifiedAt?: Date;

  @Field(() => Boolean, { nullable: true })
  deployWhenApproved?: boolean;

  @Field(() => Number, { nullable: true })
  monthlyImpressionTarget?: number;

  @Field(() => Number, { nullable: true })
  maxBudget: number;

  @Field(() => Boolean, { nullable: true })
  raiseBudgetWithImpressionTarget: boolean;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;
}
