import { Module } from '@nestjs/common';
import { UrlShortnerController } from './url-shortner.controller';
import { UrlShortnerService } from './url-shortner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrl } from './entity/shortUrl.entity';
import { ShortUrlDao } from './dao/shortUrl.dao';

@Module({
    imports: [TypeOrmModule.forFeature([ShortUrl])],
    controllers: [UrlShortnerController],
    providers: [UrlShortnerService, ShortUrlDao],
  })
export class UrlShortnerModule {}


