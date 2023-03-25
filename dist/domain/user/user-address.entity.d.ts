import { UserAddressProperties } from '@domain/user/user';
import { User } from '@domain/user/user.entity';
export declare class UserAddress implements UserAddressProperties {
    id: string;
    user: User;
    longitude: string;
    latitude: string;
    region1DepthName: string;
    region2DepthName: string;
    region3DepthName: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
