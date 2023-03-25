import { UserFollowProperties } from '@domain/user/user';
import { User } from '@domain/user/user.entity';
export declare class UserFollow implements UserFollowProperties {
    id: string;
    followingId: string;
    user: User;
    following: User;
    createdAt: Date;
}
