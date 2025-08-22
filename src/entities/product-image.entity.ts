import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  url: string;

  @Column({ name: 'is_thumbnail', default: false })
  isThumbnail: boolean;

  @Column({ name: 'sort_order', nullable: true })
  sortOrder?: number;

  @CreateDateColumn({ name: 'create_at' })
  createdAt: Date;
}
