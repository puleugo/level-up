import { PostsResponse } from '@app/community/post/commands/post.command';
import { SocialGroups } from '@app/social/social-post/commands/social.commands';
import { WishItemsProfileResponse } from '@app/wish-bucket/wish-bucket.command';
import { SocialGroupType } from '@domain/social/social-group';
import { SocialGroupUser } from '@domain/social/social-group-user.entity';
import {
  UserOauthTypeProperties,
  UserProfileProperties,
  UserProperties,
} from '@domain/user/user';
import { UserAddress } from '@domain/user/user-address.entity';

export type UserInterests = {
  interests: SocialGroupType[];
};

export type UserCreateRequestCommand = {
  user: Pick<UserProperties, 'nickname' | 'profileImageUrl'>;
} & { authType: Pick<UserOauthTypeProperties, 'username' | 'snsType'> };

export type UserAddressUpdateRequestCommand = Pick<
  UserAddress,
  'latitude' | 'longitude'
>;

export type UserAddressResponseCommand = Pick<
  UserAddress,
  'region1DepthName' | 'region2DepthName' | 'region3DepthName'
>;

export type UserProfileCommand = Pick<
  UserProperties,
  'id' | 'nickname' | 'profileImageUrl'
>;

export type SocialMemberProfileCommand = UserProfileCommand &
  Pick<SocialGroupUser, 'userStatus' | 'userRole'>;

export type UserDetailProfileResponseCommand = UserProfileCommand &
  Pick<
    UserProfileProperties,
    'followingCount' | 'followerCount' | 'mannerTemperature' | 'introduction'
  >;
