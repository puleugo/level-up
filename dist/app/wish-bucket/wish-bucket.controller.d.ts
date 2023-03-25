import { WishItemCreateRequest } from '@app/wish-bucket/dto/wish-item-create.request';
import { WishItemProfileResponseCommand } from '@app/wish-bucket/wish-bucket.command';
import { WishBucketService } from '@app/wish-bucket/wish-bucket.service';
export declare class WishBucketController {
    private readonly wishBucketService;
    constructor(wishBucketService: WishBucketService);
    addWishItem(data: WishItemCreateRequest): Promise<void>;
    getWishItemsByUserId(data: WishItemProfileResponseCommand): Promise<void>;
    getWishBucket(): Promise<void>;
    deleteWishItem(): Promise<void>;
}
