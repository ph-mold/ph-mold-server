import { CustomCategory } from 'src/entities/custom-category.entity';
import { Product } from 'src/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Product, (product) => product.tags)
  products: Product[];

  @ManyToMany(() => CustomCategory, (category) => category.tags)
  customCategories: CustomCategory[];
}
