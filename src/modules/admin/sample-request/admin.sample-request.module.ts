import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleRequest } from 'src/entities';
import { AdminSampleRequestService } from './admin.sample-request.service';
import { AdminSampleRequestController } from './admin.sample-request.controller';
import { Module } from '@nestjs/common';
import { AdminSampleRequestRepository } from './admin.sample-request.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SampleRequest])],
  providers: [AdminSampleRequestService, AdminSampleRequestRepository],
  controllers: [AdminSampleRequestController],
})
export class AdminSampleRequestModule {}
