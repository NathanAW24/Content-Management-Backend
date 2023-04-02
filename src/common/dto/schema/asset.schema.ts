import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type AssetDocument = AssetDB & Document;

@Schema()
export class AssetDB {
  @Prop({ type: String, required: true })
  assetName: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: Types.ObjectId;

  @Prop({ type: Number, default: 3 })
  duration: number;

  @Prop({ type: Number, required: true })
  fileSize: number;

  @Prop({ type: String, required: true })
  fileType: string;

  @Prop({ type: String, required: true })
  fileUrl: string;

  @Prop({ type: Date, default: Date.now })
  modifiedAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: String, default: '' })
  resolution: string;
}

export const AssetSchema = SchemaFactory.createForClass(AssetDB);
