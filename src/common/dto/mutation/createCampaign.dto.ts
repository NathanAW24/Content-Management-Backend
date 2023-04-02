import { Field, InputType } from '@nestjs/graphql';
import { AssetDto } from '../asset.dto';
import { UserDto } from '../user.dto';
import { CreateUserDto } from './createUser.dto';

@InputType()
export class CreateCampaignDto {
  @Field(() => String)
  campaignName: string;

  @Field(() => String)
  owner: string;

  @Field(() => [String], { nullable: true })
  assets?: string[];

  @Field(() => String, { nullable: true })
  status:
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

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Boolean, { nullable: true })
  deployWhenApproved: boolean;

  @Field(() => Number)
  monthlyImpressionTarget: number;

  @Field(() => Number, { nullable: true })
  maxBudget?: number;

  @Field(() => Boolean, { nullable: true })
  raiseBudgetWithImpressionTarget?: boolean;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;
}
