import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { SampleRequestService } from './sample-request.service';
import { CreateSampleRequestDto } from './dto/create-sample-request.dto';

@Controller('sample-requests')
export class SampleRequestController {
  constructor(private readonly service: SampleRequestService) {}

  @Post()
  create(@Body() dto: CreateSampleRequestDto) {
    return this.service.create(dto);
  }

  @Get(':trackingCode')
  async getOne(@Param('trackingCode') trackingCode: string) {
    return await this.service.getOne(trackingCode);
  }
}
