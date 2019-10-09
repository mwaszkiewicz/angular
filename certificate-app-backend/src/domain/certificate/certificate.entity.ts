import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bytea', { nullable: false, name : 'body'})
  bodyHex: Buffer;

  @Column('text')
  description: string;
}