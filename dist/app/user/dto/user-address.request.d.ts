import { UserAddressUpdateRequestCommand } from '@app/user/user.commands';
export declare class UserAddressRequest implements UserAddressUpdateRequestCommand {
    latitude: string;
    longitude: string;
}
