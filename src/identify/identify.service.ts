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
    if (!phoneNumber && !email) {
      throw new Error('Neither Number nor Email provided');
    }

    let parent: Contact;
    if (phoneNumber && email) {
      const linkedPhoneNumber = await this.contactDao.findByNumber(phoneNumber);
      const linkedEmail = await this.contactDao.findByEmail(email);
      parent = linkedPhoneNumber ? linkedPhoneNumber : linkedEmail;
      if (linkedPhoneNumber?.id && linkedEmail?.id) {
        parent =
          linkedPhoneNumber?.id !== linkedEmail?.id
            ? await this.joinParents(linkedPhoneNumber, linkedEmail)
            : parent;
      }
    } else if (phoneNumber) {
      parent = await this.contactDao.findByNumber(phoneNumber);
    } else {
      parent = await this.contactDao.findByEmail(email);
    }
    const newParent = await this.updateNewContact(parent, email, phoneNumber);
    return await this.findAllLinkedContact(newParent);
  }

  private async updateNewContact(
    parent: Contact,
    email?: string,
    phoneNumber?: number,
  ): Promise<Contact> {
    if (
      parent &&
      (parent?.phoneNumber != phoneNumber || parent?.email != email)
    ) {
      const newContactEntry = new Contact();
      newContactEntry.phoneNumber = phoneNumber;
      newContactEntry.email = email;
      newContactEntry.linkedId = parent.id;
      newContactEntry.linkPrecedence = 'secondary';
      await this.contactDao.create(newContactEntry);
      return parent;
    } else if (!parent) {
      const newContactEntry = new Contact();
      newContactEntry.phoneNumber = phoneNumber;
      newContactEntry.email = email;
      return await this.contactDao.create(newContactEntry);
    }
    return parent;
  }

  private async findAllLinkedContact(
    parent: Contact,
  ): Promise<IdentifyResponseDto> {
    const primaryContactId = parent.id;
    const emails: Set<string> = new Set();
    const phoneNumbers: Set<number> = new Set();
    const secondaryContactIds: number[] = [];
    const linkedContacts: Contact[] =
      await this.contactDao.findByContactByLinkedId(parent);
    linkedContacts.forEach((contact: Contact) => {
      contact.email ? emails.add(contact.email) : null;
      contact.phoneNumber ? phoneNumbers.add(contact.phoneNumber) : null;
      contact.linkedId ? secondaryContactIds.push(contact.id) : null;
    });

    return {
      primaryContactId,
      emails: [...emails],
      phoneNumbers: [...phoneNumbers],
      secondaryContactIds,
    };
  }

  private async joinParents(
    linkedPhoneNumber: Contact,
    linkedEmail: Contact,
  ): Promise<Contact> {
    if (linkedPhoneNumber.createdAt > linkedEmail.createdAt) {
      linkedPhoneNumber.linkedId = linkedEmail.id;
      linkedPhoneNumber.linkPrecedence = 'secondary';
      await this.contactDao.bulkUpdateContacts([linkedPhoneNumber]);
      return linkedEmail;
    } else {
      linkedEmail.linkedId = linkedPhoneNumber.id;
      linkedEmail.linkPrecedence = 'secondary';
      await this.contactDao.bulkUpdateContacts([linkedEmail]);
      return linkedPhoneNumber;
    }
  }
}
