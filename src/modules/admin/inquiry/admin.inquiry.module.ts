import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Inquiry } from 'src/entities';
import { AdminInquiryService } from './admin.inquiry.service';
import { AdminInquiryRepository } from './admin.inquiry.repository';
import { AdminInquiryController } from './admin.inquiry.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Inquiry])],
  providers: [AdminInquiryService, AdminInquiryRepository],
  controllers: [AdminInquiryController],
})
export class AdminInquiryModule {}
