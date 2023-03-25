import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserOauthTypeProperties, UserSNS } from '@domain/user/user';
import { UserSns } from '@domain/user/user-sns.entity';

@Entity('user_oauth_types')
export class UserOauthType implements UserOauthTypeProperties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'enum', enum: UserSNS })
  snsType: UserSNS;

  @ManyToOne(() => UserSns, (userSns) => userSns)
  userSNS: UserSns;
}
