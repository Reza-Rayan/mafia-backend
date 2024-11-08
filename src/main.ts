import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule,DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

// ---------------------------------------------------------------

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
// Swagger
  const options = new DocumentBuilder()
    .setTitle('Mafia Platform APIs')
    .setDescription('This page is for front end developers to get how connect to API and get API list')
    .setVersion('1.0')
    .build();

const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document)
// End here
  await app.listen(configService.get('port'));
}
bootstrap();
