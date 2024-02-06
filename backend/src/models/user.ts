import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  PrimaryColumn,
} from "typeorm";

@Entity({ name: "user" })
export class User extends BaseEntity {
  @PrimaryColumn({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "enum", enum: ["Admin", "Observer"], default: "Observer" })
  role!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "varchar", nullable: true })
  token!: string;
}
