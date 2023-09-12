import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BASE_URL, NUMBER_OF_RETRIES } from './constants';
import { ShortUrlDao } from './dao/shortUrl.dao';

@Injectable()
export class UrlShortnerService {
    constructor(private readonly shortUrlDao: ShortUrlDao) {}
    async shortenUrl(url: string): Promise<UrlShortnerResponse> {
        try {
            let retries = 0;
            let shortUrlhash: string;
            while(retries < NUMBER_OF_RETRIES) {
                shortUrlhash = this.hashUrl(url);
                const existingShortUrl = await this.shortUrlDao.findByUrl(shortUrlhash)
                if(!existingShortUrl) {
                    await this.shortUrlDao.saveShortUrl(url, shortUrlhash);
                    break;
                }
            }
            // If All Retries are exhausted
            if(retries === NUMBER_OF_RETRIES) throw new InternalServerErrorException("Could'nt Create Short Url Now")
            const shortUrl = `${BASE_URL}?shortUrl=${shortUrlhash}`
            // Return Shortened Url
            return {
                url,
                shortUrl,
            }
        } catch (exception) {
            console.log(exception);
            throw new InternalServerErrorException("Api Failure")
        }
    }

    async findUrl(shortUrl: string): Promise<string> {
        try { 
                const shortUrlData = await this.shortUrlDao.findByUrl(shortUrl)
                if(shortUrlData?.url) {
                    return shortUrlData.url;
                }
                throw new NotFoundException("Url Not Found")
            } catch (exception) {
            console.log(exception);
            throw new InternalServerErrorException("Api Failure")
        }
    }

    private hashUrl(url: string): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 4) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
}
