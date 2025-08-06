import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MailerService } from '@nestjs-modules/mailer';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailerService: MailerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-mail')
  async testMail() {
    await this.mailerService.sendMail({
      to: 'algo2000@naver.com',
      subject: 'Test Email',
      text: 'This is a test email',
    });
  }
}
