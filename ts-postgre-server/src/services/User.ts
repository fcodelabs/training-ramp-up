import { getRepository } from "typeorm";
import { User } from "../models/User";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";

interface CreatePasswordParams {
  token: string;
  password: string;
}


export const createUserService = async (userData: any) => {
  const userRepository = getRepository(User);
  const { name, email, role } = userData;

  const existingUser = await userRepository.findOne({
    where: { email: email },
  });

  if (existingUser) {
    throw new Error(
      "The entered email has already been registered. "
    );
  }

  const newUser = userRepository.create({
    name,
    email,
    role,
  });

  await userRepository.save(newUser);

  // Create JWT token
  const token = jwt.sign(
    { userId: newUser.id },
    process.env.JWT_SECRET || "key"
  );

  console.log(token);

  // Use token in the rest of your code
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nethkavindya@gmail.com",
      pass: "mzoh gaqq iqag uuhr",
    },
  });

  var mailOptions = {
    from: "nethkavindya@gmail.com",
    to: email,
    subject: "Account Registration - Password Creation Link ",
    text: `Dear Name, 
    You have been added as an Admin to our system. Please click the following link to create your password and access your account: 

    https://ramp-up-99ab1.web.app/create-password/${token}
    
    Please note that the password creation link is valid for one-time use only. Ensure that you use it promptly to set up your password. 

Best regards, 
[Company Name] `,



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

export const createPasswordService = async ({
  token,
  password,
}: CreatePasswordParams) => {
  try {
    const decoded: any = await jwt.verify(
      token,
      process.env.JWT_SECRET || "key"
    );
    const userId = decoded.userId;

    const userRepository = getRepository(User);
    const userToUpdate = await userRepository.findOne({
      where: { id: userId },
    });

    if (!userToUpdate) {
      throw new Error("User not found");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    userToUpdate.password = hashedPassword;

    await userRepository.save(userToUpdate);

    return { message: "Password updated successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

export const registerUserService = async (userData: any) => {
  const userRepository = getRepository(User);
  const { name, email, password } = userData;

  const existingUser = await userRepository.findOne({
    where: { email: email },
  });

  if (existingUser) {
    throw new Error(
      "User with this email already exists. Please choose a different email."
    );
  }

  const hashedPassowrd = await bcrypt.hash(password, 10);

  const newUser = userRepository.create({
    name,
    email,
    password: hashedPassowrd,
  });

  await userRepository.save(newUser);

  // Create JWT token
  const access_token = jwt.sign(
    { userId: newUser.id },
    process.env.JWT_SECRET || "key"
  );

  console.log(access_token);

  return {
    access_token,
    name: name,
    role: newUser.role,
  };
};

export const loginUserService = async (userData: any) => {
  const userRepository = getRepository(User);
  const { email, password } = userData;
  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    throw new Error("Invalid email.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password.");
  }

  const access_token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || "key",
    { expiresIn: "1h"}
    );

    const refresh_token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "key",
      { expiresIn: "7d"}
    );
  return {
    access_token,
    refresh_token,
    name: user.name,
    role: user.role,
  };
};

export const deleteAllUsersService = async () => {
  const userRepo = getRepository(User);

  const allUsers = await userRepo.find({});

  if (allUsers.length === 0) {
      throw new Error('No students found');
  }

  await userRepo.remove(allUsers);

  return 'All students deleted successfully';
};

