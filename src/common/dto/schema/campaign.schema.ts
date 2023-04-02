import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type CampaignDocument = CampaignDB & Document;

@Schema()
export class CampaignDB {
  @Prop({ type: String })
  campaignName: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: Types.ObjectId;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asset', default: [] }],
  })
  assets: Types.ObjectId[];

  @Prop({
    type: String,
    default: 'draft',
  })
  status:
    | 'DRAFT'
    | 'PROPOSED'
    | 'REJECTED_NEED_REVISION'
    | 'APPROVED_PENDING_PAYMENT'
    | 'WAITING_DEPLOYMENT'
    | 'DEPLOYED'
    | 'ERROR';

  @Prop({ type: Number, default: 0 })
  totalDuration: number;

  @Prop({ type: [String], default: [] })
  preferences: string[];

  @Prop({ type: Date, default: Date.now })
  modifiedAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Boolean, default: true })
  deployWhenApproved: boolean;

  @Prop({
    type: Number,
    default: 0,
  })
  monthlyImpressionTarget: number;

  @Prop({
    type: Number,
    default: 0,
  })
  maxBudget: number;

  @Prop({
    type: Number,
    default: 5,
  })
  price: number;

  @Prop({ type: Boolean, default: false })
  raiseBudgetWithImpressionTarget: boolean;

  @Prop({ type: Date, default: Date.now })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;
}

export const CampaignSchema = SchemaFactory.createForClass(CampaignDB);
