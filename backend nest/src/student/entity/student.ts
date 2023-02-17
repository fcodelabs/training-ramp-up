/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  personID: number;

  @Column({nullable: true})
  personName: string;

  @Column({nullable: true})
  personGender: string;

  @Column({nullable: true})
  personAddress: string;

  @Column({nullable: true})
  personMobileNo: string;

  @Column({nullable: true})
  dateOfBirth: Date;
 
}
