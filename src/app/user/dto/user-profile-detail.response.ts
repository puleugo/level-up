import { ApiProperty } from '@nestjs/swagger';

import { PostProfileResponse } from '@app/community/post/dto/post-profile.response';
import { SocialProfileResponse } from '@app/social/social-post/dto/social-profile.response';
import { UserDetailProfileResponseCommand } from '@app/user/user.commands';
import { WishItemProfileResponse } from '@app/wish-bucket/dto/wish-item-profile.response';
import { SocialGroupType } from '@domain/social/social-group';

export class UserDetailProfileResponse
  implements UserDetailProfileResponseCommand
{
  @ApiProperty({
    description: '회원 식별자',
  })
  id: string;

  @ApiProperty({
    description: '회원 아이디',
  })
  username: string;

  @ApiProperty({
    description: '회원 닉네임',
  })
  nickname: string;

  @ApiProperty({
    description: '회원 매너온도',
  })
  mannerTemperature: number;

  @ApiProperty({
    description: '회원 소개',
  })
  introduction: string;

  @ApiProperty({
    description: '회원 프로필 이미지 URL',
    nullable: true,
  })
  profileImageUrl: string | null;

  @ApiProperty({
    description: '회원 팔로잉 수',
  })
  followingCount: number;

  @ApiProperty({
    description: '회원 팔로워 수',
  })
  followerCount: number;

  @ApiProperty({
    description: '회원 관심사',
  })
  interests: SocialGroupType[];

  // @ApiProperty({
  //   description: '회원 소셜그룹',
  // })
  // socialGroups: {
  //   hostedSocialGroups: SocialProfileResponse[];
  //   endedSocialGroups: SocialProfileResponse[];
  //   ongoingSocialGroups: SocialProfileResponse[];
  // };

  // @ApiProperty({
  //   description: '회원 게시글',
  // })
  // posts: {
  //   questions: PostProfileResponse[];
  //   basics: PostProfileResponse[];
  //   memoirs: PostProfileResponse[];
  // };

  // @ApiProperty({
  //   description: '회원 위시버킷',
  // })
  // wishItems: WishItemProfileResponse[];

  constructor(data: UserDetailProfileResponseCommand) {
    Object.assign(this, data);
  }
}
