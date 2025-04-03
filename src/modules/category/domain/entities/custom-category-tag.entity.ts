import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomCategory } from './custom-category.entity';
import { Tag } from 'src/modules/tag/domain/entities/tag.entity';

@Entity('custom_category_tags')
export class CustomCategoryTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'custom_category_id' })
  customCategoryId: number;

  @Column({ name: 'tag_id' })
  tagId: number;

  @ManyToOne(() => CustomCategory)
  @JoinColumn({ name: 'custom_category_id' })
  customCategory: CustomCategory;

  @ManyToOne(() => Tag)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}
