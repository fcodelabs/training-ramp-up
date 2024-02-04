import { getRepository } from "typeorm";
import { User } from "../models/User";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const createUserService = async (userData: any) => {
  const userRepository = getRepository(User);
  const { name, email, role } = userData;

  const existingUser = await userRepository.findOne({
    where: { email: email },
  });

  if (existingUser) {
    throw new Error(
      "User with this email already exists. Please choose a different email."
    );
  }

  const newUser = userRepository.create({
    name,
    email,
    role,
  });

  await userRepository.save(newUser);

  // Create JWT token
  const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET || "key");

  console.log(token)

  // Use token in the rest of your code
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dilinaraveen@gmail.com",
      pass: "lyhf gbbf uman omgx",
    },
  });

  var mailOptions = {
    from: "dilinaraveen@gmail.com",
    to: email,
    subject: "Password Confirmation",
    text: `http://localhost:3000/create-password/${token}`,
  };

  transporter.sendMail(
    mailOptions,
    function (error: any, info: { response: string }) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );

  return newUser;
};
