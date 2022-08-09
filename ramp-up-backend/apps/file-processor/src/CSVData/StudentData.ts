import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('studentData')
@ObjectType()
export class StudentData {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column('varchar')
  name: string;

  @Field()
  @Column('varchar')
  gender: string;

  @Field()
  @Column('varchar')
  address: string;

  @Field()
  @Column('varchar')
  mobileNo: string;

  @Field()
  @Column('date')
  DOB: Date;

  @Field()
  @Column('integer')
  age: string;

  @Field()
  @Column('boolean')
  isArchive: boolean;
}
