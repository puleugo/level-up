import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PostCommentProperties } from '@domain/community/post/post';
import { Post } from '@domain/community/post/post.entity';
import { User } from '@domain/user/user.entity';

@Entity('post_comments')
@Index(['postId'])
export class PostComment implements PostCommentProperties {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  content: string;

  @Column({ type: 'int' })
  postId: number;

  @Column({ type: 'uuid' })
  authorId: string | null;

  @Column({ type: 'number', nullable: true })
  parentCommentId: number | null;

  @ManyToOne(() => User, (user) => user.comments, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => PostComment, (postComment) => postComment.parentComment, {
    nullable: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parent_comment_id' })
  parentComment: PostComment | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
