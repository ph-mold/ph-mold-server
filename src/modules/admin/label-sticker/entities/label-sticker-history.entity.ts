import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('label_sticker_histories')
export class LabelStickerHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  file_name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 100 })
  operator: string;

  @Column({ name: 'label_type', type: 'varchar', length: 50 })
  labelType: string;

  @Column({ name: 'label_data', type: 'json' })
  labelData: Record<string, any>;
}
