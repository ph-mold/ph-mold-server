import { Module } from '@nestjs/common';
import { SampleRequestController } from './sample-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleRequestService } from './sample-request.service';
import { SampleRequest } from '../product/entities/smaple-request.entity';
import { SampleRequestRepository } from './sample-request.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SampleRequest])],
  providers: [SampleRequestService, SampleRequestRepository],
  controllers: [SampleRequestController],
})
export class SampleRequestModule {}
