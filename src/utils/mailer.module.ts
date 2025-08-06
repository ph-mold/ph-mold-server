// src/utils/mailer.module.ts
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export function getMailerModule() {
  return MailerModule.forRootAsync({
    useFactory: (config: ConfigService) => ({
      transport: {
        host: config.get<string>('MAIL_HOST'),
        port: config.get<number>('MAIL_PORT'),
        secure: false,
        auth: {
          user: config.get<string>('MAIL_USER'),
          pass: config.get<string>('MAIL_PASSWORD'),
        },
      },
      defaults: {
        from: config.get<string>('MAIL_FROM'),
      },
    }),
    inject: [ConfigService],
  });
}
