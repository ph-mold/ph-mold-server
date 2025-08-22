import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Inquiry } from 'src/entities';
import { InquiryReply } from 'src/entities/admin';
import { AdminInquiryService } from './admin.inquiry.service';
import { AdminInquiryRepository } from './admin.inquiry.repository';
import { AdminInquiryController } from './admin.inquiry.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Inquiry, InquiryReply])],
  providers: [AdminInquiryService, AdminInquiryRepository],
  controllers: [AdminInquiryController],
})
export class AdminInquiryModule {}
