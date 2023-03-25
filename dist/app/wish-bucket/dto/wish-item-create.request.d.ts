import { WishItemCreateCommand } from '@app/wish-bucket/wish-bucket.command';
export declare class WishItemCreateRequest implements WishItemCreateCommand {
    title: string;
    price: number;
    imageUrl: string;
    url: string;
}
