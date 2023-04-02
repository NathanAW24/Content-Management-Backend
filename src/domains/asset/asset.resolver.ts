import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import {
  CreateAssetDto,
  AssetDto,
  FindByIdDto,
  EditAssetDto,
} from 'src/common/dto';
import { AssetService } from './asset.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Resolver()
export class AssetResolver {
  constructor(private readonly assetService: AssetService) {}

  @Query(() => AssetDto)
  @UseGuards(AuthGuard)
  async getAsset(@Args('args') args: FindByIdDto) {
    return this.assetService.findById(args);
  }

  @Query(() => [AssetDto])
  @UseGuards(AuthGuard)
  async asset() {
    return this.assetService.findAll();
  }

  @Mutation(() => AssetDto)
  @UseGuards(AuthGuard)
  async createAsset(@Args('input') input: CreateAssetDto) {
    return this.assetService.create(input);
  }

  @Mutation(() => AssetDto)
  @UseGuards(AuthGuard)
  async deleteAsset(@Args('args') args: FindByIdDto) {
    return this.assetService.deleteOne(args);
  }

  @Mutation(() => AssetDto)
  @UseGuards(AuthGuard)
  async editAsset(@Args('args') args: EditAssetDto) {
    return this.assetService.editOne(args);
  }
}
