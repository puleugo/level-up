import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '@app/user/user.module';
import { WishBucketController } from '@app/wish-bucket/wish-bucket.controller';
import { WishBucketService } from '@app/wish-bucket/wish-bucket.service';
import { User } from '@domain/user/user.entity';
import { WishItem } from '@domain/wish-bucket/wish-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WishItem, User]),
    forwardRef(() => UserModule),
  ],
  providers: [WishBucketService],
  controllers: [WishBucketController],
  exports: [WishBucketService],
})
export class WishBucketModule {}
