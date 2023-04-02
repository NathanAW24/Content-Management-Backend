import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import {
  CreateChannelDto,
  ChannelDto,
  FindUserDto,
  FindByIdDto,
  EditChannelDto,
} from 'src/common/dto';
import { getChannelRevenueDto } from 'src/common/dto/query/getChannelRevenue.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ChannelService } from './channel.service';

@Resolver()
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Query(() => ChannelDto)
  @UseGuards(AuthGuard)
  async getChannel(@Args('args') args: FindByIdDto) {
    return this.channelService.findById(args);
  }

  @Query(() => [ChannelDto])
  @UseGuards(AuthGuard)
  async channel() {
    return this.channelService.findAll();
  }

  @Mutation(() => ChannelDto)
  @UseGuards(AuthGuard)
  async createChannel(@Args('input') input: CreateChannelDto) {
    return this.channelService.create(input);
  }

  @Mutation(() => ChannelDto)
  @UseGuards(AuthGuard)
  async deleteChannel(@Args('args') args: FindByIdDto) {
    return this.channelService.deleteOne(args);
  }

  @Mutation(() => ChannelDto)
  @UseGuards(AuthGuard)
  async editChannel(@Args('args') args: EditChannelDto) {
    return this.channelService.editOne(args);
  }

  @Query(() => [ChannelDto])
  @UseGuards(AuthGuard)
  async getChannelRevenue(@Args('args') args: getChannelRevenueDto) {
    return this.channelService.getChannelRevenue(args);
  }
}
