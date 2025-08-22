import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CustomCategory } from './custom-category.entity';
import { Tag } from 'src/entities/tag.entity';

@Entity('custom_category_tags')
export class CustomCategoryTag {
  @PrimaryColumn({ name: 'custom_category_id' })
  customCategoryId: number;

  @PrimaryColumn({ name: 'tag_id' })
  tagId: number;

  @Column({ type: 'enum', enum: ['include', 'exclude'], default: 'include' })
  type: 'include' | 'exclude';

  // 선택적 관계 설정
  @ManyToOne(() => CustomCategory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'custom_category_id' })
  customCategory: CustomCategory;

  @ManyToOne(() => Tag, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}
