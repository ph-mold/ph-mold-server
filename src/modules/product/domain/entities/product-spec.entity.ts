import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_specs')
export class ProductSpec {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'spec_type' })
  specType: string;

  @Column({ name: 'spec_value' })
  specValue: string;

  @ManyToOne(() => Product, (product) => product.specs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
