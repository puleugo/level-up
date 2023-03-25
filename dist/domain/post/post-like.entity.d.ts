import { PostLikeProperties } from '@domain/post/post';
import { Post } from '@domain/post/post.entity';
import { User } from '@domain/user/user.entity';
export declare class PostLike implements PostLikeProperties {
    id: string;
    user: User;
    post: Post;
    createdAt: Date;
    deletedAt: Date | null;
}
