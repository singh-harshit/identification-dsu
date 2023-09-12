import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrl } from './url-shortner/entity/shortUrl.entity';
import { UrlShortnerModule } from './url-shortner/url-shortner.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [ShortUrl],
      synchronize: true,
    }),
    UrlShortnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
