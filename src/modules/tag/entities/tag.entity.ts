import { CustomCategory } from 'src/modules/category/entities/custom-category.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Product, (product) => product.tags)
  products: Product[];

  @ManyToMany(() => CustomCategory, (category) => category.tags)
  customCategories: CustomCategory[];
}
