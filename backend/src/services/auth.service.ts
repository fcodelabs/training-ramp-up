import { RefreshToken } from "../entity/refreshToken";
import { db } from "../utils/db.server";

export type RefreshTokenObject = {
  id: string;
  token: string;
  userId: string;
};

// export const getToken = async (id: string): Promise<RefreshToken | null> => {
//   return db.refreshToken.findUnique({
//     where: {
//       id,
//     },
//   });
// };

// export const createToken = async (
//   refreshToken: RefreshToken
// ): Promise<RefreshToken> => {
//   const { id, token, userId } = refreshToken;
//   return db.refreshToken.create({
//     data: {
//       id,
//       token,
//       userId,
//     },
//     select: {
//       id: true,
//       token: true,
//       userId: true,
//     },
//   });
// };

// export const deleteToken = async (id: string): Promise<void> => {
//   await db.refreshToken.delete({
//     where: {
//       id,
//     },
//   });
// };

export const getToken = async (
  id: string
): Promise<RefreshTokenObject | null> => {
  return RefreshToken.findOneBy({
    id: id,
  });
};

export const createToken = async (
  refreshToken: RefreshTokenObject
): Promise<RefreshTokenObject> => {
  const { id, token, userId } = refreshToken;
  const newRefreshToken = new RefreshToken();
  newRefreshToken.id = id;
  newRefreshToken.token = token;
  newRefreshToken.userId = userId;
  return newRefreshToken.save();
};

export const deleteToken = async (id: string): Promise<void> => {
  const refreshTokenToDelete = await RefreshToken.findOneBy({ id: id });
  if (!refreshTokenToDelete) {
    throw new Error("Token not found");
  }
  refreshTokenToDelete.remove();
};
