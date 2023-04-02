import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { transformArrayToObjectId } from 'src/common/utils';
import {
  AssetDocument,
  CampaignDB,
  CampaignDocument,
  CampaignDto,
  ChannelDocument,
  CreateUserDto,
  EditUserDto,
  FindUserDto,
  UserDB,
  UserDocument,
} from 'src/common/dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: mongoose.Model<UserDocument>,
    @InjectModel('Campaign')
    private readonly campaignModel: mongoose.Model<CampaignDocument>,
    @InjectModel('Asset')
    private readonly assetModel: mongoose.Model<AssetDocument>,
    @InjectModel('Channel')
    private readonly channelModel: mongoose.Model<ChannelDocument>,
  ) {}

  async create(input: CreateUserDto) {
    const newUser = new this.userModel(input);
    return await newUser.save();
  }

  async findOneUser(args: FindUserDto): Promise<UserDB | null> {
    const condition = {
      ...(args._id && { _id: new mongoose.Types.ObjectId(args?._id) }),
      ...(args.userSub && { userSub: args?.userSub }),
      ...(args.email && { email: args?.email }),
    };
    const aggregatedUsers = await this.userModel.aggregate([
      {
        $match: condition,
      },
      {
        $lookup: {
          from: 'campaigns',
          localField: 'campaigns',
          foreignField: '_id',
          as: 'campaigns',
        },
      },
      {
        $lookup: {
          from: 'assets',
          localField: 'assets',
          foreignField: '_id',
          as: 'assets',
        },
      },
      {
        $lookup: {
          from: 'channels',
          localField: 'channels',
          foreignField: '_id',
          as: 'channels',
        },
      },
    ]);
    return aggregatedUsers[0];
  }

  async findAll(): Promise<UserDB[]> {
    const aggregatedUsers = await this.userModel.aggregate([
      {
        $lookup: {
          from: 'campaigns',
          localField: 'campaigns',
          foreignField: '_id',
          as: 'campaigns',
        },
      },
      {
        $lookup: {
          from: 'assets',
          localField: 'assets',
          foreignField: '_id',
          as: 'assets',
        },
      },
      {
        $lookup: {
          from: 'channels',
          localField: 'channels',
          foreignField: '_id',
          as: 'channels',
        },
      },
    ]);
    return aggregatedUsers;
  }

  async deleteOne(args: FindUserDto) {
    const condition = {
      ...(args._id && { _id: new mongoose.Types.ObjectId(args?._id) }),
      ...(args.userSub && { userSub: args?.userSub }),
      ...(args.email && { email: args?.email }),
    };
    const targetUser = await this.userModel.findById(args._id);
    if (!targetUser) return;

    //deleteCampaign
    for (const campaign of targetUser.campaigns) {
      await this.campaignModel.deleteOne(campaign._id);
    }
    //deletedAsset
    for (const asset of targetUser.assets) {
      await this.assetModel.deleteOne(asset._id);
    }
    //delete channels
    for (const channel of targetUser.channels) {
      await this.channelModel.deleteOne(channel._id);
    }

    const deletedUser = await this.userModel.findByIdAndDelete(condition);
    return deletedUser;
  }

  async editOne(args: EditUserDto) {
    const { _id, ...restFields } = args;
    if (!restFields) throw new Error('Invalid arguments');
    const updateFields = {
      modifiedAt: Date.now(),
      ...restFields,
    };
    const updateUser = await this.userModel.findOneAndUpdate(
      { _id: args._id },
      { $set: updateFields },
      {
        rawResult: true,
      },
    );
    if (!updateUser.value) throw new Error('Failed to update user.');
    return updateUser.value;
  }
}
