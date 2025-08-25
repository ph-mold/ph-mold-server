import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Inquiry } from 'src/entities';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { GetInquiriesDto } from './dto/get-inquiries.dto';
import {
  InquiryResponseDto,
  PaginatedInquiriesResponseDto,
} from './dto/inquiry-response.dto';
import * as bcrypt from 'bcrypt';
import { InquiryRepository } from './inquiry.repository';
import { MaskUtil } from '../../common/utils/mask.util';
import { CreateInquiryReplyDto } from './dto/create-inquiry-reply.dto';

@Injectable()
export class InquiryService {
  constructor(private readonly repository: InquiryRepository) {}

  async create(createInquiryDto: CreateInquiryDto): Promise<Inquiry> {
    const hashedPassword = await bcrypt.hash(createInquiryDto.password, 10);
    return this.repository.createInquiry(createInquiryDto, hashedPassword);
  }

  async findAll(dto: GetInquiriesDto): Promise<PaginatedInquiriesResponseDto> {
    const [items, total] = await this.repository.findInquiries(dto);

    const maskedInquiries = items.map((inquiry) => {
      const response = new InquiryResponseDto(inquiry);
      response.company = MaskUtil.maskCompany(inquiry.company);
      response.name = MaskUtil.maskName(inquiry.name);
      response.phone = MaskUtil.maskPhone(inquiry.phone);
      return response;
    });

    return {
      items: maskedInquiries,
      total,
      page: dto.page,
      limit: dto.limit,
      totalPages: Math.ceil(total / dto.limit),
    };
  }

  async findOne(id: number, password: string): Promise<Inquiry> {
    const inquiry = await this.repository.findInquiryById(id);

    if (!inquiry) {
      throw new NotFoundException('문의를 찾을 수 없습니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, inquiry.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('비밀번호가 일치하지 않습니다.');
    }

    return inquiry;
  }

  async reply(id: number, dto: CreateInquiryReplyDto) {
    const inquiry = await this.repository.findInquiryById(id);
    if (!inquiry) {
      throw new NotFoundException('문의를 찾을 수 없습니다.');
    }
    const isPasswordValid = await bcrypt.compare(
      dto.password,
      inquiry.password,
    );
    if (!isPasswordValid) {
      throw new ForbiddenException('비밀번호가 일치하지 않습니다.');
    }

    return this.repository.createInquiryReply(id, dto);
  }
}
