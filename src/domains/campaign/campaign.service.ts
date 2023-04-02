import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Error } from 'mongoose';
import {
  transformArrayToObjectId,
  transformStringToObjectId,
} from 'src/common/utils';
import {
  CampaignDB,
  CampaignDocument,
  CampaignDto,
  ChannelDocument,
  CreateCampaignDto,
  EditCampaignDto,
  FindByIdDto,
  UserDocument,
} from 'src/common/dto';
import { getCampaignForChannelDto } from 'src/common/dto/query/getCampaignForChannel.dto';

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel('Campaign')
    private campaignModel: mongoose.Model<CampaignDocument>,
    @InjectModel('User')
    private readonly userModel: mongoose.Model<UserDocument>,
    @InjectModel('Channel')
    private readonly channelModel: mongoose.Model<ChannelDocument>,
  ) {}

  async findById(args: FindByIdDto): Promise<CampaignDB | null> {
    const aggregatedCampaigns = await this.campaignModel.aggregate([
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
          from: 'assets',
          localField: 'assets',
          foreignField: '_id',
          as: 'assets',
        },
      },
    ]);
    return aggregatedCampaigns[0];
  }

  async findAll(): Promise<CampaignDB[]> {
    const aggregatedCampaigns = await this.campaignModel.aggregate([
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
          from: 'assets',
          localField: 'assets',
          foreignField: '_id',
          as: 'assets',
        },
      },
    ]);
    return aggregatedCampaigns;
  }

  async create(input: CreateCampaignDto) {
    //change string input (graphql)to object id
    const { owner, ...restFields } = input;
    const newFields = {
      ...restFields,
      owner: await transformStringToObjectId(owner),
    };
    const newCampaign = new this.campaignModel(newFields);

    //update user also. add campaign to user's campaign field\
    const appendCampaignToUser = await this.userModel.updateOne(
      { _id: newCampaign.owner },
      { $push: { campaigns: newCampaign._id } },
    );
    //user not found
    if (appendCampaignToUser.modifiedCount !== 1) {
      throw new Error('User Not Found. Please input valid userId.');
    }
    //save campaign
    const savedCampaign = await newCampaign.save();
    //change object id ref to real values
    await savedCampaign.populate('owner');
    return savedCampaign;
  }

  async appendCampaignToUser(
    userId: mongoose.Types.ObjectId,
    campaignId: mongoose.Types.ObjectId,
  ) {
    const updateUserCampaign = await this.userModel.updateOne(
      { _id: userId },
      { $push: { campaigns: campaignId } },
    );
    return updateUserCampaign;
  }

  async deleteOne(args: FindByIdDto) {
    const targetCampaign = await this.campaignModel.findById(args._id);
    if (!targetCampaign) return null;
    //remove campaign from campaigns array in user
    const removeCampaignFromUser = await this.userModel.updateOne(
      {
        _id: targetCampaign.owner,
      },
      { $pull: { campaigns: targetCampaign._id } },
    );
    if (removeCampaignFromUser.modifiedCount !== 1) {
      throw new Error(
        'Error: Cannot delete campaign on user. Either user not found or campaign not found on user.',
      );
    }
    return await targetCampaign.delete();
  }

  async editOne(args: EditCampaignDto) {
    const { _id, ...restFields } = args;
    if (!restFields) throw new Error('Invalid arguments');
    const updateFields = {
      modifiedAt: Date.now(),
      ...restFields,
    };
    const updateCampaign = await this.campaignModel.findOneAndUpdate(
      { _id: args._id },
      { $set: updateFields },
      {
        rawResult: true,
      },
    );
    if (!updateCampaign.value) throw new Error('Failed to update campaign.');
    return updateCampaign.value;
  }

  async getCampaignForChannel(args: getCampaignForChannelDto) {
    const { channelId, startTime, endTime } = args;
    //grab channel.campaigns, filter to see which one is "DEPLOYED" and within timeRange.
    const targetChannel = await this.channelModel.findById(channelId);
    if (!targetChannel)
      throw new Error('Channel not found. Please input valid channelId field.');
    const { campaigns, ...restFields } = await targetChannel;
    // eslint-disable-next-line
    let campaignList: any[] = [];
    for (let i = 0; i < campaigns.length; i++) {
      const campaign = await this.campaignModel.findById(campaigns[i]);
      if (!campaign) throw new Error('Campaign not found');
      await campaign.populate('assets');
      campaignList.push(campaign);
    }
    const checkCampaign = (campaign: CampaignDB) => {
      const active = campaign.status === 'DEPLOYED';
      const inRangeTime1 = campaign.startDate <= startTime;
      const inRangeTime2 = campaign.endDate >= endTime;
      return active && inRangeTime1 && inRangeTime2;
    };

    const activeCampaign = campaignList.filter(checkCampaign);
    return activeCampaign;
  }
}
