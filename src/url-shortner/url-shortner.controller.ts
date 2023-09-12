import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { UrlShortnerService } from './url-shortner.service';
import { UrlShortnerRequestDto } from './dto/urlShortnerRequest.dto';
import { Response } from 'express';

@Controller('api/shortUrl')
export class UrlShortnerController {
  constructor(private readonly urlShortnerService: UrlShortnerService) {}


  @Post('')
  async identify(
    @Body() requestBody: UrlShortnerRequestDto,
  ): Promise<UrlShortnerResponse> {
    const { url } = requestBody;
    try {
      const response = await this.urlShortnerService.shortenUrl(url);
      return response;
    } catch (e) {
      return e;
    }
  }

  @Get('')
  async findUrl(
    @Query('shortUrl') shortUrl: string,
    @Res() res: Response
  ) {
    try {
      const response = await this.urlShortnerService.findUrl(shortUrl);
      res.redirect(301, response)
      return ({url: response, external: true});
    } catch (e) {
      return e;
    }
  }
}
