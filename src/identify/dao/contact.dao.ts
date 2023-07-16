import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Contact } from '../entity/contact.entiity';

@Injectable()
export class ContactDao {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  async findById(id: number): Promise<Contact | undefined> {
    const options: FindOneOptions<Contact> = { where: { id } };
    return this.contactRepository.findOne(options);
  }

  async findByEmail(email: string): Promise<Contact> {
    const options: FindManyOptions<Contact> = {
      where: {
        email,
      },
    };
    let topParent: Contact = await this.contactRepository.findOne(options);
    if (topParent) {
      topParent = await this.findAndUpdateParentChain(topParent);
    }
    return topParent;
  }

  async findByNumber(phoneNumber: number): Promise<Contact> {
    const options: FindManyOptions<Contact> = {
      where: {
        phoneNumber,
      },
    };
    let topParent: Contact = await this.contactRepository.findOne(options);
    if (topParent) {
      topParent = await this.findAndUpdateParentChain(topParent);
    }
    return topParent;
  }

  private async findAndUpdateParentChain(baseParent) {
    const parentChain: Contact[] = [];
    parentChain.push(baseParent);
    for (let contact of parentChain) {
      if (contact.linkedId)
        parentChain.push(await this.findById(contact.linkedId));
    }
    const topParent = parentChain[parentChain.length - 1];
    for (let i = 0; i < parentChain.length - 1; i++) {
      parentChain[i].linkedId = topParent.id;
    }
    await this.bulkUpdateContacts(parentChain);
    return topParent;
  }

  async findByContactByLinkedId(parent: Contact): Promise<Contact[]> {
    const linkedContacts: Contact[] = [];
    linkedContacts.push(parent);
    for (let contact of linkedContacts) {
      const options: FindManyOptions<Contact> = {
        where: {
          linkedId: contact.id,
        },
      };
      let extraAddedContacts = await this.contactRepository.find(options);
      linkedContacts.push(...extraAddedContacts);
    }
    return linkedContacts;
  }

  async create(contact: Contact): Promise<Contact> {
    return this.contactRepository.save(contact);
  }

  async bulkUpdateContacts(contacts: Contact[]): Promise<void> {
    await this.contactRepository.save(contacts);
  }
}
