import { ApiProperty } from '@nestjs/swagger';

import { WishItemCreateCommand } from '@app/wish-bucket/wish-bucket.command';

export class WishItemCreateRequest implements WishItemCreateCommand {
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
}
