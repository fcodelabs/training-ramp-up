const Joi = require("joi");
const jwt = require("jsonwebtoken");
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class User {
  generateAuthToken(user: User) {
    throw new Error("Method not implemented.");
  }
  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column()
  userRole: string;
  static methods: any;
}

export function validateUser(user: any) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user).error;
}

export const generateAuthToken = (data) => {
  const token = jwt.sign(
    { id: data?._id, userRole: data?.userRole },
    "jwtPrivateKey",
    {
      expiresIn: "1d",
    }
  );
  return token;
};
