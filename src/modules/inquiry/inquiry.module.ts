import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InquiryController } from './inquiry.controller';
import { InquiryService } from './inquiry.service';
import { InquiryRepository } from './inquiry.repository';
import { Inquiry } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Inquiry])],
  controllers: [InquiryController],
  providers: [InquiryService, InquiryRepository],
  exports: [InquiryService],
})
export class InquiryModule {}
