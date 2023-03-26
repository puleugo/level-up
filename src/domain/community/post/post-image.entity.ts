import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Memoir } from '@domain/community/post/memoir.entity';
import { Post } from '@domain/community/post/post.entity';

@Entity('post_images')
export class PostImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Post, (post) => post)
  post: Post;

  @ManyToOne(() => Memoir, (memoir) => memoir.images)
  memoir: Memoir;

  @Column({ unique: true })
  uri: string;
}
