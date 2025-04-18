import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { SpecType } from './spec_type.entity';

@Entity('product_specs')
export class ProductSpec {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'value' })
  value: string;

  @ManyToOne(() => Product, (product) => product.specs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => SpecType, (type) => type.productSpecs, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'spec_type_id' })
  specType: SpecType;
}
