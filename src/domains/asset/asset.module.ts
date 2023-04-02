import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import {
  AssetSchema,
  CampaignSchema,
  ChannelSchema,
  UserSchema,
} from '../../common/dto';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetResolver } from './asset.resolver';
import { UserModule } from '../user/user.module';
import { CampaignModule } from '../campaign/campaign.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Campaign', schema: CampaignSchema },
      { name: 'Channel', schema: ChannelSchema },
      { name: 'Asset', schema: AssetSchema },
    ]),
    UserModule,
    CampaignModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AssetService, AssetResolver],
  controllers: [AssetController],
  exports: [AssetService, MongooseModule],
})
export class AssetModule {}
