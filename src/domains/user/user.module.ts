import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AssetSchema,
  CampaignSchema,
  ChannelSchema,
  UserSchema,
} from 'src/common/dto';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
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
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [MongooseModule],
})
export class UserModule {}
