import { NestFactory } from '@nestjs/core';
import { AppModule } from './shared/http/app.module';
import swagger from './config/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swagger.document(app)
  await app.listen(process.env.PORT);
}
bootstrap();
