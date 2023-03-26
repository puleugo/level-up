import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TopicCommand } from '@domain/topic/topic';

@Entity('topics')
export class Topic implements TopicCommand {
  @PrimaryColumn('varchar')
  topic: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
