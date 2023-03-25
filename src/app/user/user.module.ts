import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Coord2addressClient } from '@app/infrastructure/types/coord2address.client';
import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';
import { Mission } from '@domain/todo/mission.entity';
import { UserOauthType } from '@domain/user/oauth-type.entity';
import { UserAddress } from '@domain/user/user-address.entity';
import { UserProfile } from '@domain/user/user-profile.entity';
import { UserSns } from '@domain/user/user-sns.entity';
import { User } from '@domain/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserAddress,
      UserProfile,
      UserSns,
      UserOauthType,
      Mission,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, Coord2addressClient],
  exports: [UserService],
})
export class UserModule {}
