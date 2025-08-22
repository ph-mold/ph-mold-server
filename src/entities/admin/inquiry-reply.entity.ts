import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Inquiry } from '../inquiry.entity';

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

  @ManyToOne(() => Inquiry, (inquiry) => inquiry.replies, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'inquiry_id' })
  inquiry: Inquiry;

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
