import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAssetDto {
  @Field(() => String)
  assetName: string;

  @Field(() => String)
  owner: string;

  @Field(() => Number)
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
