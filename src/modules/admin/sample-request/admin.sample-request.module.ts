import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleRequest } from 'src/modules/product/entities/smaple-request.entity';
import { AdminSampleRequestService } from './admin.sample-request.service';
import { AdminSampleRequestController } from './admin.sample-request.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([SampleRequest])],
  providers: [AdminSampleRequestService],
  controllers: [AdminSampleRequestController],
})
export class AdminSampleRequestModule {}
