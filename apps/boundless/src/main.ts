import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConsoleLogger, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerConfigModule } from './swagger-config/swagger-config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      json: true,
      colors: true,
    }),
  });
  const configService = app.get(ConfigService);

  const logger = new Logger('Bootstrap');
  const port = configService.get<number>('PORT', 3000);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerConfigModule.setup(app);

  await app.listen(port);

  logger.log(`Everything okay 🚀, Application is running on: http://localhost:${port}/${globalPrefix}`);
  logger.log(`Environment: ${configService.get('NODE_ENV', 'development')}`);
}
bootstrap().catch((error) => {
  Logger.error('❌ Failed to start application', error);
  process.exit(1);
});
