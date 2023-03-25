import { HttpService } from '@nestjs/axios';

import { KakaoAddressResponse } from '@app/infrastructure/types/kakao-address.reesonse';
import { UserAddressUpdateRequestCommand } from '@app/user/user.commands';
import { KakaoApiFailedException } from '@domain/errors/auth.errors';

export class Coord2addressClient {
  constructor(private readonly httpService: HttpService) {}

  async getCoord2address(
    address: UserAddressUpdateRequestCommand,
  ): Promise<KakaoAddressResponse> {
    const { data, status } = await this.httpService.axiosRef.request({
      method: 'GET',
      url: `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${address.latitude}&y=${address.longitude}&input_coord=WGS84`,
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
      },
    });

    if (status !== 200) {
      throw new KakaoApiFailedException();
    }

    return data.documents[0].address;
  }
}
