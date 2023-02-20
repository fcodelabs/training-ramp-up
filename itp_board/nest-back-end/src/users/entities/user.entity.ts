import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryColumn('varchar')
  email: string;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar')
  password: string;

  @Column('boolean')
  admin: boolean;
}

export { User };
