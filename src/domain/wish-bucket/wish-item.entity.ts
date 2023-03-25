import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { WishItemProperties } from '@domain/wish-bucket/wish-bucket';

@Entity('wish_items')
export class WishItem implements WishItemProperties {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  imageUrl: string;

  @Column()
  url: string;
}
