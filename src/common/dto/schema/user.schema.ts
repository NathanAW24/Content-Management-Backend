import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type UserDocument = UserDB & Document;

@Schema()
export class UserDB {
  @Prop({ type: String, unique: true, required: true })
  userSub: string;

  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, default: '' })
  profileName: string;

  @Prop({ type: String, default: '' })
  profileUrl: string;

  @Prop({ type: [String], default: [] })
  roles: string[];

  @Prop({ type: Number, default: 0 })
  assetStorageUsed: number;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', default: [] },
    ],
  })
  campaigns: Types.ObjectId[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asset', default: [] }],
  })
  assets: Types.ObjectId[];

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', default: [] },
    ],
  })
  channels: Types.ObjectId[];

  @Prop({ type: Date, default: Date.now })
  modifiedAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDB);
