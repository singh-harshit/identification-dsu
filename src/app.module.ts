import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentifyModule } from './identify/identify.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './identify/entity/contact.entiity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Contact],
      synchronize: true,
    }),
    IdentifyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
