import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  PersonID: number;

  @Column()
  PersonName!: string;

  @Column()
  PersonGender!: string;

  @Column()
  PersonAddress!: string;

  @Column()
  PersonMobileNo!: string;

  @Column()
  DateOfBirth!: Date;
}
