import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { minutes, seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short',
          ttl: seconds(10),
          limit: 10,
          blockDuration: minutes(1),
        },
        {
          name: 'medium',
          ttl: minutes(1),
          limit: 50,
          blockDuration: seconds(5),
        },
        {
          name: 'long',
          ttl: minutes(10),
          limit: 100,
          blockDuration: seconds(5),
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule { }
