import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

export const port = 443;
export const clientId = '773tcfx0hhon87';
export const clientSecret = '4PpVgPyViAJg3w1t';

const httpsOptions = {
  key: fs.readFileSync('./certs/2/server.key', 'utf8'),
  cert: fs.readFileSync('./certs/2/server.cert', 'utf8'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.enableCors();
  await app.listen(port);
}
bootstrap();
