import { Injectable } from '@nestjs/common';

import {
  WishItemCreateCommand,
  WishItemProfileResponseCommand,
} from '@app/wish-bucket/wish-bucket.command';

@Injectable()
export class WishBucketService {
  constructor() {}

  async addWishItem(data: WishItemCreateCommand) {
    return;
  }

  async getWishItems(data: WishItemProfileResponseCommand) {
    return;
  }

  async getWishBucket() {
    return;
  }

  async deleteWishItem() {
    return;
  }
}
