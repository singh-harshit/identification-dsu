import { Injectable } from '@nestjs/common';
import { IdentifyResponseDto } from './dto/response/identifyResponseHandler.dto';

@Injectable()
export class IdentifyService {
  identify(email?: string, phoneNumber?: number): IdentifyResponseDto {
    const primaryContactId = 1;
    const emails: string[] = [];
    const phoneNumbers: number[] = []; // Replace with the actual phone numbers
    const secondaryContactIds: number[] = []; // Replace with the actual secondary contact IDs

    return {
      primaryContactId,
      emails,
      phoneNumbers,
      secondaryContactIds,
    };
  }
}
