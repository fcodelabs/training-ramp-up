import { text } from "node:stream/consumers";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum Role {
  ADMIN = "admin",
  GUEST = "guest",
  EDITOR = "editor",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  UserID: number;

  @Column()
  @Index({
    unique: true,
  })
  Email: string;

  @Column()
  Password: string;

  @Column({
    type: "enum",
    enum: Role,
  })
  Role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //   @Column("text", { array: true, default: "{}" })
  //   RefreshToken: string[];
  @Column("text", { default: "" })
  RefreshToken: string;

  @Column("text", { default: "local" })
  Provider: string;
}
