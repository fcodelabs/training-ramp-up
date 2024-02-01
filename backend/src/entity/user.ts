import { Entity, Column, PrimaryColumn } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class User {
  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  tempToken: string;

  @Column({ default: false })
  verified: boolean;

  async comparePassword(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
  }

  async compareTempToken(enteredToken: string): Promise<boolean> {
    try {
      return await bcrypt.compare(enteredToken, this.tempToken);
    } catch (error) {
      return false;
    }
  }
}
