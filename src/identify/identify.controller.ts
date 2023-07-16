import { Body, Controller, Post } from '@nestjs/common';
import { IdentifyService } from './identify.service';
import { IdentifyRequestDto } from './dto/request/identifyRequest.dto';
import { IdentifyResponseDto } from './dto/response/identifyResponseHandler.dto';

@Controller('identify')
export class IdentifyController {
  constructor(private readonly identifyService: IdentifyService) {}
  @Post('')
  async identify(
    @Body() requestBody: IdentifyRequestDto,
  ): Promise<IdentifyResponseDto> {
    const { email, phoneNumber } = requestBody;
    try {
      const response = await this.identifyService.identify(email, phoneNumber);
      return response;
    } catch (e) {
      return e;
    }
  }
}
