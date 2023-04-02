import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CampaignService } from './campaign.service';
import {
  CampaignDto,
  CreateCampaignDto,
  EditCampaignDto,
  FindByIdDto,
} from 'src/common/dto';
import mongoose from 'mongoose';
import { getCampaignForChannelDto } from 'src/common/dto/query/getCampaignForChannel.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class CampaignResolver {
  constructor(private readonly campaignService: CampaignService) {}

  @Query(() => CampaignDto)
  @UseGuards(AuthGuard)
  async getCampaign(@Args('args') args: FindByIdDto) {
    return this.campaignService.findById(args);
  }

  @Query(() => [CampaignDto])
  @UseGuards(AuthGuard)
  async campaign() {
    return this.campaignService.findAll();
  }

  @Mutation(() => CampaignDto)
  @UseGuards(AuthGuard)
  async createCampaign(@Args('input') input: CreateCampaignDto) {
    const createdCampaign = await this.campaignService.create(input);
    return createdCampaign;
  }

  @Mutation(() => CampaignDto)
  @UseGuards(AuthGuard)
  async deleteCampaign(@Args('args') args: FindByIdDto) {
    const deletedCampaign = await this.campaignService.deleteOne(args);
    return deletedCampaign;
  }

  @Mutation(() => CampaignDto)
  @UseGuards(AuthGuard)
  async editCampaign(@Args('args') args: EditCampaignDto) {
    return await this.campaignService.editOne(args);
  }

  @Query(() => [CampaignDto])
  @UseGuards(AuthGuard)
  async getCampaignForChannel(@Args('args') args: getCampaignForChannelDto) {
    return await this.campaignService.getCampaignForChannel(args);
  }
}
