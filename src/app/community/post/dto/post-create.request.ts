import { IsNotEmpty, IsString } from 'class-validator';

import { PostCreateRequestCommand } from '@app/community/post/commands/post.command';
import { User } from '@domain/user/user.entity';

export class PostCreateRequest implements PostCreateRequestCommand {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  author: User;
}
