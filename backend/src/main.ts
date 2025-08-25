import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

async function bootstrap() {
  // Create NestJS app
  const app = await NestFactory.create(AppModule);

  // Enable cookies
  app.use(cookieParser());

  // Enable CORS and allow credentials so cookies work
  app.enableCors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // front-end URL
    credentials: true, 
  });

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/graphql`);
}
bootstrap();
