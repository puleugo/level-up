import { HttpService } from '@nestjs/axios';
import { KakaoAddressResponse } from '@app/infrastructure/types/kakao-address.reesonse';
import { UserAddressUpdateRequestCommand } from '@app/user/user.commands';
export declare class Coord2addressClient {
    private readonly httpService;
    constructor(httpService: HttpService);
    getCoord2address(address: UserAddressUpdateRequestCommand): Promise<KakaoAddressResponse>;
}
