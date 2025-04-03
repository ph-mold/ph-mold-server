import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductSpec } from './product-spec.entity';
import { Tag } from 'src/modules/tag/domain/entities/tag.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_code' })
  productCode: string;

  @Column()
  name: string;

  @Column({ name: 'main_category' })
  mainCategory: string;

  @Column({ name: 'sub_category' })
  subCategory: string;

  @Column()
  material: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => ProductSpec, (spec) => spec.product, { cascade: true })
  specs: ProductSpec[];

  @ManyToMany(() => Tag, (tag) => tag.products, { cascade: true })
  @JoinTable({
    name: 'product_tags',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];
}
