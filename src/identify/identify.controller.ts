import { Body, Controller, Post } from '@nestjs/common';
import { IdentifyService } from './identify.service';
import { IdentifyRequestDto } from './dto/request/identifyRequest.dto';
import { IdentifyResponseDto } from './dto/response/identifyResponseHandler.dto';

@Controller('identify')
export class IdentifyController {
  constructor(private readonly identifyService: IdentifyService) {}
  @Post('')
  identify(@Body() requestBody: IdentifyRequestDto): IdentifyResponseDto {
    const { email, phoneNumber } = requestBody;
    const response = this.identifyService.identify(email, phoneNumber);
    return response;
  }
}
