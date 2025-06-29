import { INestApplication, Module } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Module({})
export class SwaggerConfigModule {
  static setup(app: INestApplication): void {
    if (process.env.NODE_ENV === 'production') return;

    const config = new DocumentBuilder()
      .setTitle('QuickPost API')
      .setDescription('The QuickPost REST API docs')
      .setVersion('1.0')
      .addTag('posts')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }
}
