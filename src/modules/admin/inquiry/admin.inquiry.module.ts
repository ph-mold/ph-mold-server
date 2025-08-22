import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Inquiry } from 'src/entities';
import { AdminInquiryService } from './admin.inquiry.service';
import { AdminInquiryRepository } from './admin.inquiry.repository';
import { AdminInquiryController } from './admin.inquiry.controller';
import { InquiryReply } from 'src/entities/admin';

@Module({
  imports: [TypeOrmModule.forFeature([Inquiry, InquiryReply])],
  providers: [AdminInquiryService, AdminInquiryRepository],
  controllers: [AdminInquiryController],
})
export class AdminInquiryModule {}
