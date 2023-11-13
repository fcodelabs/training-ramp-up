import { db } from "../utils/db.server";

export type RefreshToken = {
  id: string;
  token: string;
  userId: string;
};

export const getToken = async (id: string): Promise<RefreshToken | null> => {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
};

export const createToken = async (
  refreshToken: RefreshToken
): Promise<RefreshToken> => {
  const { id, token, userId } = refreshToken;
  return db.refreshToken.create({
    data: {
      id,
      token,
      userId,
    },
    select: {
      id: true,
      token: true,
      userId: true,
    },
  });
};

export const deleteToken = async (id: string): Promise<void> => {
  await db.refreshToken.delete({
    where: {
      id,
    },
  });
};
