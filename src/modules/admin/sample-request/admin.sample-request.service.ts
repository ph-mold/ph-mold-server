import { Injectable } from '@nestjs/common';
import { AdminSampleRequestRepository } from './admin.sample-request.repository';
import { GetSampleRequestsDto } from './dto/get-sample-requests.dto';
import { AuthPayload } from '../auth/auth.type';
import { CompletedDto, ProcessingDto, ShippedDto } from './dto/process-dto';
import { MailerService } from '@nestjs-modules/mailer';
import { formatKoreanDate } from 'src/utils/format';

@Injectable()
export class AdminSampleRequestService {
  constructor(
    private readonly repo: AdminSampleRequestRepository,
    private readonly mailerService: MailerService,
  ) {}

  async getSampleRequests() {
    return this.repo.findAllWithProduct();
  }

  async getSampleRequestsWithPagination(dto: GetSampleRequestsDto) {
    const [items, total] =
      await this.repo.findAllWithSampleRequestPagination(dto);

    return {
      items,
      total,
      page: dto.page,
      limit: dto.limit,
    };
  }

  async getSampleRequest(id: number) {
    return this.repo.findOneWithProduct(id);
  }

  async completeReception(id: number, user: AuthPayload) {
    const data = await this.repo.completeReception(id, user);
    await this.mailerService.sendMail({
      to: data.email,
      subject: `[팜앤몰드] ${data.company}의 샘플 요청 접수 완료`,
      template: 'sample-request/reception',
      context: {
        customerName: data.name,
        requestDate: formatKoreanDate(data.createdAt),
        product: data.product,
        quantity: data.quantity,
        shippingInfo: {
          recipient: data.name,
          phone: data.phone,
          address: [data.address, data.detailedAddress]
            .filter(Boolean)
            .join(', '),
        },
        requestId: data.trackingCode,
      },
    });
    return data;
  }

  async completeProcessing(id: number, dto: ProcessingDto, user: AuthPayload) {
    return await this.repo.completeProcessing(id, dto, user);
  }

  async completeShipped(id: number, dto: ShippedDto, user: AuthPayload) {
    const data = await this.repo.completeShipped(id, dto, user);

    await this.mailerService.sendMail({
      to: data.email,
      subject: `[팜앤몰드] ${data.company}의 샘플 배송 접수 완료`,
      template: 'sample-request/shipped',
      context: {
        customerName: data.name,
        requestDate: formatKoreanDate(new Date(dto.shippedAt)),
        product: data.product,
        quantity: data.quantity,
        shippingInfo: {
          recipient: data.name,
          phone: data.phone,
          address: [data.address, data.detailedAddress]
            .filter(Boolean)
            .join(', '),
        },
        trackingNumber: dto.trackingNumber,
        requestId: data.trackingCode,
      },
    });

    return data;
  }

  async completeCompleted(id: number, dto: CompletedDto, user: AuthPayload) {
    return await this.repo.completeCompleted(id, dto, user);
  }
}
