import { UserProfileProperties } from '@domain/user/user';
import { User } from '@domain/user/user.entity';
export declare class UserProfile implements UserProfileProperties {
    id: string;
    followerCount: number;
    followingCount: number;
    introduction: string;
    mannerTemperature: number;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
