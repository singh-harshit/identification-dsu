import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  phoneNumber: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  linkedId: number;

  @Column({ nullable: true, default: 'primary' })
  linkPrecedence: 'secondary' | 'primary';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
