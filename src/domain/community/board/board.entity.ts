import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Post } from '@domain/community/post/post.entity';
import { Topic } from '@domain/topic/topic.entity';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  title: string;

  @Column({ nullable: true })
  description: string | null;

  @OneToMany(() => Post, (post) => post)
  posts: Post[];

  @OneToOne(() => Topic, (topic) => topic, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'title' })
  topic: Topic;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
