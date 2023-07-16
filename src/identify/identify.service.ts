import { Injectable } from '@nestjs/common';
import { IdentifyResponseDto } from './dto/response/identifyResponseHandler.dto';
import { ContactDao } from './dao/contact.dao';
import { Contact } from './entity/contact.entiity';

@Injectable()
export class IdentifyService {
  constructor(private readonly contactDao: ContactDao) {}
  async identify(
    email?: string,
    phoneNumber?: number,
  ): Promise<IdentifyResponseDto> {
    const primaryContactId = 1;
    const emails: string[] = [];
    const phoneNumbers: number[] = []; // Replace with the actual phone numbers
    const secondaryContactIds: number[] = []; // Replace with the actual secondary contact IDs
    const contact = new Contact();

    return {
      primaryContactId,
      emails,
      phoneNumbers,
      secondaryContactIds,
    };
  }
}
