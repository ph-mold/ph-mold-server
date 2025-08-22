import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Inquiry } from '../inquiry.entity';
import { User } from '../admin/user.entity';

export enum ReplyType {
  CUSTOMER = 'CUSTOMER',
  COMPANY = 'COMPANY',
}

@Entity('inquiry_replies')
export class InquiryReply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'inquiry_id' })
  inquiryId: number;

  @Column({
    type: 'enum',
    enum: ReplyType,
    default: ReplyType.COMPANY,
    comment: '답변 주체: CUSTOMER(고객), COMPANY(회사)',
    name: 'reply_type',
  })
  replyType: ReplyType;

  @Column({ type: 'text', comment: '답변 내용' })
  content: string;

  @Column({
    name: 'assigned_user_id',
    nullable: true,
    comment: '담당자 ID (COMPANY 타입일 때만 사용)',
  })
  assignedUserId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Inquiry, (inquiry) => inquiry.replies, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'inquiry_id' })
  inquiry: Inquiry;

  // 담당자와의 관계 (COMPANY 타입일 때만 사용)
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assigned_user_id' })
  assignedUser: User;
}
