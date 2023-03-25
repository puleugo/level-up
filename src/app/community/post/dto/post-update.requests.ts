import { PostUpdateRequestCommand } from '@app/community/post/commands/post.command';

export class PostUpdateRequest implements PostUpdateRequestCommand {
  title: string;
  content: string;
}
