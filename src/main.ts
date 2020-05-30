import { ApplicationContext } from './app.context';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await ApplicationContext();
  app.enableCors();
  await app.listen(app.get(ConfigService).get('APP_PORT'));
}
bootstrap();
