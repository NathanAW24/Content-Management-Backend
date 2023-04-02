import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type ChannelDocument = ChannelDB & Document;

@Schema()
export class ChannelDB {
  @Prop({ type: String, required: true, unique: true })
  channelId: string;

  @Prop({ type: String, required: true })
  channelName: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  })
  owner: Types.ObjectId;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', default: [] },
    ],
  })
  campaigns: Types.ObjectId[];

  @Prop({ type: String })
  resolution: string;

  @Prop({ type: String })
  deviceCredentials: string;

  @Prop({ type: String })
  channelType: string;

  @Prop({ type: String, default: process.env.DEFAULT_CHANNEL_THUMBNAIL })
  thumbnailUrl: string;

  @Prop({ type: String })
  location?: string;

  @Prop({
    type: { driver: Number, adswift: Number, carRental: Number },
    default: { driver: 25, adswift: 50, carRental: 25 },
  })
  shares: {
    driver: number;
    adswift: number;
    carRental: number;
  };

  @Prop({ type: String })
  locationDetails?: string;

  @Prop({ type: Date, default: Date.now })
  modifiedAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ChannelSchema = SchemaFactory.createForClass(ChannelDB);
