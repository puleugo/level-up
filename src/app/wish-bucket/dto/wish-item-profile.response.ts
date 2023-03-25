import { ApiProperty } from '@nestjs/swagger';

import { WishItemProfileResponseCommand } from '@app/wish-bucket/wish-bucket.command';

export class WishItemProfileResponse implements WishItemProfileResponseCommand {
  @ApiProperty({
    description: '위시 아이템 아이디',
  })
  id: number;

  @ApiProperty({
    description: '위시 아이템 제목',
  })
  title: string;

  @ApiProperty({
    description: '위시 아이템 가격',
  })
  price: number;

  @ApiProperty({
    description: '위시 아이템 이미지 URL',
  })
  imageUrl: string;

  @ApiProperty({
    description: '위시 아이템 URL',
  })
  url: string;

  @ApiProperty({
    description: '위시 아이템 좋아요 수',
  })
  likeCount: number;
}
