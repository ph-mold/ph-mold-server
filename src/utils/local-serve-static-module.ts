import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

export function getLocalStaticModules() {
  if (process.env.APP_ENV !== 'local') return [];
  return [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'contents'),
      serveRoot: '/contents',
    }),
  ];
}
