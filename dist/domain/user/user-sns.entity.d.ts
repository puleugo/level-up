import { UserOauthType } from '@domain/user/oauth-type.entity';
import { UserSnsProperties } from '@domain/user/user';
import { User } from '@domain/user/user.entity';
export declare class UserSns implements UserSnsProperties {
    id: string;
    user: User;
    userOauthTypes: UserOauthType[];
}
