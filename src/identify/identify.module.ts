import { Module } from '@nestjs/common';
import { IdentifyController } from './identify.controller';
import { IdentifyService } from './identify.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entity/contact.entiity';
import { ContactDao } from './dao/contact.dao';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  controllers: [IdentifyController],
  providers: [IdentifyService, ContactDao],
})
export class IdentifyModule {}
