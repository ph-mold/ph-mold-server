import { Tag } from 'src/entities/tag.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomCategoryTag } from './custom-category-tag.entity';

@Entity('custom_categories')
export class CustomCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @Column()
  name: string;

  @Column({ name: 'parent_id', nullable: true })
  parentId?: number;

  @Column({ name: 'image_url', nullable: true })
  imageUrl?: string;

  @Column({ name: 'created_by', nullable: true })
  createdBy: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => CustomCategory, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parent_id' })
  parent?: CustomCategory;

  @ManyToMany(() => Tag, (tag) => tag.customCategories, { cascade: true })
  @JoinTable({
    name: 'custom_category_tags',
    joinColumn: { name: 'custom_category_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];

  @OneToMany(() => CustomCategoryTag, (ct) => ct.customCategory)
  customCategoryTags: CustomCategoryTag[];
}
