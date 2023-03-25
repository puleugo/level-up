import { Request } from '@app/infrastructure/types/request.types';
import { MissionAlarmResponse } from '@app/todo/dto/mission/todo-alarm.response';
import { UserTodoResponse } from '@app/todo/dto/mission/user-todo-response';
import { UserAddressRequest } from '@app/user/dto/user-address.request';
import { UserAddressResponse } from '@app/user/dto/user-address.response';
import { UserDetailProfileResponse } from '@app/user/dto/user-profile-detail.response';
import { UserService } from '@app/user/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    updateUserAddress(address: UserAddressRequest, { user }: Request): Promise<UserAddressResponse>;
    getUserDetailProfile({ user }: Request): Promise<UserDetailProfileResponse>;
    getMyProgress({ user }: Request): Promise<UserTodoResponse[]>;
    getMyAlarms({ user }: Request): Promise<MissionAlarmResponse[]>;
}
