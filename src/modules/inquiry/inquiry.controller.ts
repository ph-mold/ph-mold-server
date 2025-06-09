import { Controller } from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('inquiries')
@ApiTags('Inquiries')
export class InquiryController {
  constructor(private readonly service: InquiryService) {}
}
