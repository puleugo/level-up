import { UserOauthTypeProperties, UserSNS } from '@domain/user/user';
import { UserSns } from '@domain/user/user-sns.entity';
export declare class UserOauthType implements UserOauthTypeProperties {
    id: string;
    username: string;
    snsType: UserSNS;
    userSNS: UserSns;
}
