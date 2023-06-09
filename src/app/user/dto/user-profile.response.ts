import { ApiProperty } from '@nestjs/swagger';

import { UserProfileCommand } from '@app/user/user.commands';

export class UserProfileResponse implements UserProfileCommand {
  @ApiProperty({
    description: '사용자 아이디',
  })
  id: string;

  @ApiProperty({
    description: '사용자 닉네임',
  })
  nickname: string;

  @ApiProperty({
    description: '사용자 프로필 이미지 URL',
  })
  profileImageUrl: string | null;

  constructor({ id, nickname, profileImageUrl }: UserProfileCommand) {
    this.id = id;
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
  }
}
