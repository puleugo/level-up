import { ApiProperty } from '@nestjs/swagger';

import { PostProfileResponseCommand } from '@app/community/post/commands/post.command';
import { UserProfileResponse } from '@app/user/dto/user-profile.response';

export class PostProfileResponse implements PostProfileResponseCommand {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '제목' })
  title: string;

  @ApiProperty({ example: '내용' })
  content: string;

  @ApiProperty({ example: 0 })
  likeCount: number;

  @ApiProperty({ example: 0 })
  commentCount: number;

  @ApiProperty({ example: '게시판 주제1' })
  category: string;

  @ApiProperty({ example: UserProfileResponse })
  author: UserProfileResponse;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  createdAt: Date;

  constructor(post: PostProfileResponseCommand) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.likeCount = post.likeCount;
    this.commentCount = post.commentCount;
    this.category = post.category;
    this.createdAt = post.createdAt;
    this.author = new UserProfileResponse(post.author);
  }
}
