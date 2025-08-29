import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Client } from '../client.entity';

export enum EstimateTemplateType {
  INDIVIDUAL = 'INDIVIDUAL', // 개인사업자
  CORPORATE = 'CORPORATE', // 법인사업자
}

@Entity('estimates')
export class Estimate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: EstimateTemplateType,
    comment: '템플릿 타입: INDIVIDUAL(개인사업자), CORPORATE(법인사업자)',
  })
  templateType: EstimateTemplateType;

  @Column({ name: 'client_id' })
  clientId: number;

  @Column({
    type: 'json',
    comment: '견적 데이터 (JSON 형태)',
  })
  estimateData: Record<string, any>;

  @Column({
    type: 'text',
    nullable: true,
    comment: '메모',
  })
  memo: string;

  @Column({ name: 'created_by_admin_id' })
  createdByAdminId: number;

  @Column({ name: 'updated_by_admin_id' })
  updatedByAdminId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // 고객과의 관계
  @ManyToOne(() => Client, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  // 견적을 생성한 관리자와의 관계
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'created_by_admin_id' })
  createdByAdmin: User;

  // 견적을 업데이트한 관리자와의 관계
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'updated_by_admin_id' })
  updatedByAdmin: User;
}
