import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { ShortUrl } from '../entity/shortUrl.entity';

@Injectable()
export class ShortUrlDao {
  constructor(
    @InjectRepository(ShortUrl)
    private readonly shortUrlRepostiory: Repository<ShortUrl>,
  ) {}

  async findByUrl(shortUrl: string): Promise<ShortUrl | undefined> {
    const options: FindOneOptions<ShortUrl> = { where: { shortUrl } };
    return this.shortUrlRepostiory.findOne(options);
  }

  async saveShortUrl(url: string, shortUrl: string): Promise<void> {
    let shortUrlObject = new ShortUrl();
    shortUrlObject.url = url;
    shortUrlObject.shortUrl = shortUrl;
    await this.shortUrlRepostiory.save(shortUrlObject);
  }
}
