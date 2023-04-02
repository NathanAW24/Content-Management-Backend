import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AssetSchema,
  CampaignSchema,
  ChannelSchema,
  UserSchema,
} from 'src/common/dto';
import { ChannelResolver } from './channel.resolver';
import { UserModule } from '../user/user.module';
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
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [ChannelService, ChannelResolver],
  controllers: [ChannelController],
})
export class ChannelModule {}
