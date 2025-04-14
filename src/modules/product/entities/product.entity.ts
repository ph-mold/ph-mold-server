import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductSpec } from './product-spec.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ name: 'main_category', nullable: true })
  mainCategory: string;

  @Column({ name: 'sub_category', nullable: true })
  subCategory: string;

  @Column({ nullable: true })
  material: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => ProductSpec, (spec) => spec.product, { cascade: true })
  specs: ProductSpec[];

  @Column({ name: 'thumbnail_image_url', nullable: true })
  thumbnailImageUrl?: string;

  @ManyToMany(() => Tag, (tag) => tag.products, { cascade: true })
  @JoinTable({
    name: 'product_tags',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];
}
