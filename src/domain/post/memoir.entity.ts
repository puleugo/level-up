import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PostImage } from '@domain/post/post-image.entity';
import { Mission } from '@domain/todo/mission.entity';
import { User } from '@domain/user/user.entity';

@Entity('memoirs')
export class Memoir {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ type: 'int', primary: true })
  todoId: number;

  @Column({ type: 'uuid', primary: true })
  userId: string;

  @Column({ nullable: true })
  logging: string | null;

  @Column({ nullable: true })
  keep: string | null;

  @Column({ nullable: true })
  problem: string | null;

  @Column({ nullable: true })
  try: string | null;

  @ManyToOne(() => Mission, (toDo) => toDo.memoirs)
  @JoinColumn({ name: 'todoId', referencedColumnName: 'id' })
  mission: Mission;

  @OneToMany(() => PostImage, (memoirImage) => memoirImage.memoir)
  images: PostImage[];

  @ManyToOne(() => User, (user) => user.memoirs)
  author: User;
}
