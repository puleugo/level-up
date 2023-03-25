//TODO: Implement
import { WishItemProperties } from '@domain/wish-bucket/wish-bucket';

export type WishItemsProfileResponse = {
  wishItems: WishItemProperties[];
};

export type WishItemProfileResponseCommand = WishItemProperties;

export type WishItemCreateCommand = Pick<
  WishItemProperties,
  'title' | 'price' | 'imageUrl' | 'url'
>;
