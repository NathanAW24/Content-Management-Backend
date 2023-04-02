import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignController } from './campaign.controller';
import { CampaignResolver } from './campaign.resolver';
import { CampaignService } from './campaign.service';
import {
  AssetSchema,
  CampaignSchema,
  ChannelSchema,
  UserSchema,
} from 'src/common/dto';
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
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [CampaignController],
  providers: [CampaignService, CampaignResolver],
  exports: [MongooseModule],
})
export class CampaignModule {}
