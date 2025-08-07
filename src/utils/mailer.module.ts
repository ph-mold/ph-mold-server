import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import * as path from 'path';

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
      template: {
        dir: path.join(process.cwd(), 'src/templates/emails'),
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
    inject: [ConfigService],
  });
}
