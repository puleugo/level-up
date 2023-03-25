import { WishItemCreateCommand, WishItemProfileResponseCommand } from '@app/wish-bucket/wish-bucket.command';
export declare class WishBucketService {
    constructor();
    addWishItem(data: WishItemCreateCommand): Promise<void>;
    getWishItems(data: WishItemProfileResponseCommand): Promise<void>;
    getWishBucket(): Promise<void>;
    deleteWishItem(): Promise<void>;
}
