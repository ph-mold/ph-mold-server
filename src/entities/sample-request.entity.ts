import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

export type SampleRequestStatus =
  | 'reception'
  | 'processing'
  | 'shipped'
  | 'completed';

@Entity('sample_requests')
export class SampleRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.sampleRequests, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  name: string;

  @Column()
  company: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ name: 'detailed_address' })
  detailedAddress: string;

  @Column()
  quantity: number;

  @Column({ default: false })
  agree: boolean;

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @Column({ default: 'reception' })
  status: string; // 콤마로 구분된 완료된 상태들

  @Column({ name: 'assigned_user_id', nullable: true })
  assignedUserId?: number;

  @Column({ name: 'completed_at', nullable: true })
  completedAt?: Date;

  @Column({ name: 'tracking_code', nullable: true, unique: true })
  trackingCode?: string;

  @Column({ name: 'node_data', type: 'json', nullable: true })
  nodeData?: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // 완료된 상태들을 배열로 반환
  getCompletedStatuses(): SampleRequestStatus[] {
    return this.status.split(',').filter(Boolean) as SampleRequestStatus[];
  }

  // 특정 상태가 완료되었는지 확인
  isStatusCompleted(status: SampleRequestStatus): boolean {
    return this.getCompletedStatuses().includes(status);
  }

  // 상태 추가
  addStatus(status: SampleRequestStatus): void {
    const completedStatuses = this.getCompletedStatuses();
    if (!completedStatuses.includes(status)) {
      completedStatuses.push(status);
      this.status = completedStatuses.join(',');
    }
  }

  // 현재 진행 중인 상태 반환 (마지막 완료된 상태의 다음 상태)
  getCurrentStatus(): SampleRequestStatus {
    const completedStatuses = this.getCompletedStatuses();
    const allStatuses: SampleRequestStatus[] = [
      'reception',
      'processing',
      'shipped',
      'completed',
    ];

    if (completedStatuses.length === 0) return 'reception';
    if (completedStatuses.includes('completed')) return 'completed';

    const lastCompletedIndex = allStatuses.indexOf(
      completedStatuses[completedStatuses.length - 1],
    );
    const nextIndex = lastCompletedIndex + 1;

    return allStatuses[nextIndex] || 'completed';
  }
}
