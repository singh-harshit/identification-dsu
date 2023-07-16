import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
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

  async create(contact: Contact): Promise<Contact> {
    return this.contactRepository.save(contact);
  }

  async update(contact: Contact): Promise<Contact> {
    return this.contactRepository.save(contact);
  }

  async delete(id: number): Promise<void> {
    await this.contactRepository.softDelete(id);
  }
}
