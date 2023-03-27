import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Board } from '@domain/community/board/board.entity';
import { PostComment } from '@domain/community/comment/post-comment.entity';
import { PostProperties } from '@domain/community/post/post';
import { PostImage } from '@domain/community/post/post-image.entity';
import { PostLike } from '@domain/community/post/post-like.entity';
import { User } from '@domain/user/user.entity';

@Entity('posts')
@Index(['boardId'])
export class Post implements PostProperties {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column()
  content: string;

  @Column()
  boardId: string;

  @Column({ type: 'int', nullable: true })
  toDoId: number | null;

  @ManyToOne(() => User, (user) => user)
  author: User;

  @Column({ type: 'int', default: 0 })
  views: number;

  @OneToMany(() => PostLike, (postLike) => postLike)
  likes: PostLike[];

  @Column({ type: 'int', default: 0 })
  likeCount: number;

  @OneToMany(() => PostComment, (postComment) => postComment)
  comments: PostComment[];

  @Column({ type: 'int', default: 0 })
  commentCount: number;

  @ManyToOne(() => Board, (board) => board.posts)
  @JoinColumn({ name: 'board_id', referencedColumnName: 'id' })
  board: Board;

  @OneToMany(() => PostImage, (postImage) => postImage)
  images: PostImage[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
