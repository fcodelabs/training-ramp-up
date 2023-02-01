const Joi = require("joi");
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column()
  mobile: string;

  @Column()
  dob!: Date;

  @Column()
  age: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}

export function validateStudent(student: any) {
  const schema = Joi.object({
    name: Joi.string()
      .regex(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{0,}$/, "name")
      .required(),
    gender: Joi.string().required(),
    address: Joi.string().required(),
    mobile: Joi.string()
      .length(10)
      .regex(/^[0-9]+$/, "given")
      .required(),
    dob: Joi.date().required(),
    age: Joi.number().required(),
  });

  return schema.validate(student).error;
}
