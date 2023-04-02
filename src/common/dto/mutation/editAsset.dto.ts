import { Field, ID, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class EditAssetDto {
  @Length(24)
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: true })
  assetName: string;

  @Field(() => Number, { nullable: true })
  duration?: number;

  @Field(() => Date, { nullable: true })
  modifiedAt?: Date;
}
