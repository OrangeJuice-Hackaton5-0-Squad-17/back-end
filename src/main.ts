import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Swagger documentation to Orange Portfólio Application - Squad-17')
    .setDescription(
      "This app's for learning and practicing for the Orange Juice Hackathon 5.0. It's meant to be a simple portfolio showcase where users can interact and share their work.")
    .setVersion('1.0')
    .addTag('user')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  
  await app.listen(3333);
}
bootstrap();
