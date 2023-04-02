import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CampaignDto } from './campaign.dto';
import { UserDto } from './user.dto';

@ObjectType()
export class AssetDto {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  assetName: string;

  @Field(() => UserDto)
  owner: UserDto;

  @Field(() => Number, { nullable: true })
  duration: number;

  @Field(() => Number)
  fileSize: number;

  @Field(() => String)
  fileType: string;

  @Field(() => String)
  fileUrl: string;

  @Field(() => Date, { nullable: true })
  modifiedAt?: Date;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;
}
