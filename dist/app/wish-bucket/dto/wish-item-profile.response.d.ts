import { WishItemProfileResponseCommand } from '@app/wish-bucket/wish-bucket.command';
export declare class WishItemProfileResponse implements WishItemProfileResponseCommand {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    url: string;
    likeCount: number;
}
