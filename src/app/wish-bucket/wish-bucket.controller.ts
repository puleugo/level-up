import { Controller } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

import { WishItemCreateRequest } from '@app/wish-bucket/dto/wish-item-create.request';
import { WishItemProfileResponseCommand } from '@app/wish-bucket/wish-bucket.command';
import { WishBucketService } from '@app/wish-bucket/wish-bucket.service';

@Controller()
@ApiExcludeController()
export class WishBucketController {
  constructor(private readonly wishBucketService: WishBucketService) {}

  async addWishItem(data: WishItemCreateRequest) {
    return await this.wishBucketService.addWishItem(data);
  }

  async getWishItemsByUserId(data: WishItemProfileResponseCommand) {
    return await this.wishBucketService.getWishItems(data);
  }

  async getWishBucket() {
    return await this.wishBucketService.getWishBucket();
  }

  async deleteWishItem() {
    return await this.wishBucketService.deleteWishItem();
  }
}
