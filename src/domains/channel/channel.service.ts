import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  CreateChannelDto,
  ChannelDB,
  ChannelDocument,
  FindByIdDto,
  UserDocument,
  EditChannelDto,
} from 'src/common/dto';
import { getChannelRevenueDto } from 'src/common/dto/query/getChannelRevenue.dto';
import {
  transformArrayToObjectId,
  transformStringToObjectId,
} from 'src/common/utils';

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel('Channel')
    private readonly channelModel: mongoose.Model<ChannelDocument>,
    @InjectModel('User')
    private readonly userModel: mongoose.Model<UserDocument>,
  ) {}

  async create(input: CreateChannelDto) {
    const { owner, ...restFields } = input;

    //transform string input from graphql to object ids
    const newFields = {
      ...restFields,
      owner: await transformStringToObjectId(owner),
    };
    const newChannel = new this.channelModel(newFields);
    //append channels to user
    const appendChannelToUser = await this.userModel.updateOne(
      {
        _id: newChannel.owner,
      },
      { $push: { channels: newChannel._id } },
    );
    if (appendChannelToUser.modifiedCount !== 1) {
      throw new Error('User Not Found. Please input valid userId.');
    }
    const savedChannel = await newChannel.save();
    //replace objectIds with real values
    await savedChannel.populate('owner');
    return savedChannel;
  }

  async findById(args: FindByIdDto): Promise<ChannelDB | null> {
    const aggregatedChannels = await this.channelModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(args._id),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'owner',
        },
      },
      {
        $lookup: {
          from: 'campaigns',
          localField: 'campaigns',
          foreignField: '_id',
          as: 'campaigns',
        },
      },
    ]);
    if (!aggregatedChannels[0]) {
      throw new Error('Channel not found. Please input valid channel Id.');
    }
    return aggregatedChannels[0];
  }

  async findAll(): Promise<ChannelDB[]> {
    const aggregatedChannels = await this.channelModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'owner',
        },
      },
      {
        $lookup: {
          from: 'campaigns',
          localField: 'campaigns',
          foreignField: '_id',
          as: 'campaigns',
        },
      },
    ]);
    return aggregatedChannels;
  }

  async deleteOne(args: FindByIdDto) {
    const targetChannel = await this.channelModel.findById(args._id);
    if (!targetChannel) throw new Error('Channel not found.');
    //removee channel from channels array in user
    const removeChannelFromUser = await this.userModel.updateOne(
      {
        _id: targetChannel.owner,
      },
      { $pull: { channels: targetChannel._id } },
    );
    if (removeChannelFromUser.modifiedCount !== 1) {
      throw new Error(
        'Error: Cannot delete channel on user. Either user not found or channel not found on user.',
      );
    }
    return await targetChannel.delete();
  }

  async editOne(args: EditChannelDto) {
    const { _id, ...restFields } = args;
    if (!restFields) throw new Error('Invalid arguments');
    const updateFields = {
      modifiedAt: Date.now(),
      ...restFields,
    };
    const updateChannel = await this.channelModel.findOneAndUpdate(
      { _id: args._id },
      { $set: updateFields },
      {
        rawResult: true,
      },
    );
    if (!updateChannel.value) throw new Error('Failed to update channel.');
    return updateChannel.value;
  }

  async getChannelRevenue(args: getChannelRevenueDto) {
    return;
  }
}
