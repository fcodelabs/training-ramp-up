import { Role } from "@prisma/client";
import { db } from "../utils/db.server";
import bcrypt from "bcrypt";

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

export const listUsers = async (): Promise<Omit<User, "password">[]> => {
  return db.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getUser = async (
  id: string
): Promise<Omit<User, "password"> | null> => {
  return db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const createUser = async (
  user: Omit<User, "id">
): Promise<Omit<User, "password">> => {
  user.password = bcrypt.hashSync(user.password, 12);
  const { username, email, password } = user;
  return db.user.create({
    data: {
      username,
      email,
      password,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const updateUser = async (
  user: Omit<User, "id">,
  id: string
): Promise<Omit<User, "password">> => {
  const { username, email, password } = user;
  return db.user.update({
    where: {
      id,
    },
    data: {
      username,
      email,
      password,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const deleteUser = async (id: string): Promise<void> => {
  await db.user.delete({
    where: {
      id,
    },
  });
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return db.user.findUnique({
    where: { email },
  });
};
