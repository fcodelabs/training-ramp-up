/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  PersonID: number;

  @Column({nullable: true})
  PersonName: string;

  @Column({nullable: true})
  PersonGender: string;

  @Column({nullable: true})
  PersonAddress: string;

  @Column({nullable: true})
  PersonMobileNo: string;

  @Column({nullable: true})
  DateOfBirth: Date;
 
}
