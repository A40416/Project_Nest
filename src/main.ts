import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted: true,
  }));
  app.setGlobalPrefix('api/v1', {exclude:['']})
  
  app.enableCors(
    {
    "origin": true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    credentials: true
    }
  );

  const config = new DocumentBuilder()
  .setTitle('Swagger API')
  .setVersion('1.0')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header',})
  .build();

  const document= SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(port);
  
}
bootstrap();
