import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  transformArrayToObjectId,
  transformStringToObjectId,
} from 'src/common/utils';
import {
  CreateAssetDto,
  AssetDB,
  AssetDocument,
  FindByIdDto,
  UserDocument,
  EditAssetDto,
} from 'src/common/dto';

@Injectable()
export class AssetService {
  constructor(
    @InjectModel('Asset')
    private readonly assetModel: mongoose.Model<AssetDocument>,
    @InjectModel('User')
    private readonly userModel: mongoose.Model<UserDocument>,
  ) {}

  async findById(args: FindByIdDto): Promise<any> {
    const aggregatedAssets = await this.assetModel.aggregate([
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
    ]);
    return aggregatedAssets[0];
  }

  async findAll(): Promise<AssetDB[]> {
    const aggregatedAssets = await this.assetModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'owner',
        },
      },
    ]);
    return aggregatedAssets;
  }

  async create(input: CreateAssetDto) {
    const { owner, ...restFields } = input;
    //replace string input from graphql to object id for mongo
    const newFields = {
      owner: await transformStringToObjectId(owner),
      ...restFields,
    };
    //save the document to mongo
    const newAsset = new this.assetModel(newFields);
    const assetSaved = await newAsset.save();

    //update the user fields for asset and storage used.
    const updateUser = await this.userModel.updateOne(
      {
        _id: assetSaved.owner,
      },
      { $push: { assets: assetSaved._id } },
    );

    const incrementStorageUsedUser = await this.userModel.updateOne(
      {
        _id: assetSaved.owner,
      },
      { $inc: { assetStorageUsed: assetSaved.fileSize } },
    );

    //replace object ids with real values

    await assetSaved.populate('owner');
    return assetSaved;
  }

  async deleteOne(args: FindByIdDto) {
    const targetAsset = await this.assetModel.findById(args._id);
    if (!targetAsset) {
      throw new Error('asset not found');
    }

    const ownerRef = await this.userModel.findById(targetAsset.owner);
    if (!ownerRef) throw new Error('owner not found');
    await ownerRef.populate('campaigns');

    //check if asset is still used by some campaign
    for (const campaign of ownerRef.campaigns) {
      // @ts-ignore:next-line
      for (const asset of campaign.assets) {
        if (asset.toString() === targetAsset._id.toString()) {
          throw new Error( // @ts-ignore:next-line
            `asset is used at ${campaign._id}, ${campaign.campaignName}`,
          );
        }
      }
    }
    //remove asset from user array
    const removeAssetFromUser = await this.userModel.updateOne(
      {
        _id: targetAsset.owner,
      },
      { $pull: { assets: targetAsset._id } },
    );

    const decrementStorageUsedUser = await this.userModel.updateOne(
      {
        _id: targetAsset.owner,
      },
      { $inc: { assetStorageUsed: -1 * targetAsset.fileSize } },
    );

    if (removeAssetFromUser.modifiedCount !== 1) {
      throw new Error(
        'Error: Cannot delete asset/decrement storage used on user. Either user not found or asset not found on user.',
      );
    }
    if (decrementStorageUsedUser.modifiedCount !== 1) {
      throw new Error(
        'Error: Cannot decrement storage used on user. User not found.',
      );
    }
    return await targetAsset.delete();
  }

  async editOne(args: EditAssetDto) {
    const { _id, ...restFields } = args;
    if (!restFields) throw new Error('Invalid arguments');
    const updateFields = {
      modifiedAt: Date.now(),
      ...restFields,
    };
    const updateAsset = await this.assetModel.findOneAndUpdate(
      { _id: args._id },
      { $set: updateFields },
      {
        rawResult: true,
      },
    );
    if (!updateAsset.value) throw new Error('Failed to update asset.');
    return updateAsset.value;
  }
}
