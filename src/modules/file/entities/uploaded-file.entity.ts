import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('uploaded_files')
export class UploadedFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string; // 파일의 해시값

  @Column({ name: 'original_name' })
  originalName: string;

  @Column()
  path: string;

  @Column({ default: false })
  used: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
