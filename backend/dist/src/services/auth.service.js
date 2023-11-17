"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteToken = exports.createToken = exports.getToken = void 0;
const refreshToken_1 = require("../entity/refreshToken");
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
const getToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return refreshToken_1.RefreshToken.findOneBy({
        id: id,
    });
});
exports.getToken = getToken;
const createToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token, userId } = refreshToken;
    const newRefreshToken = new refreshToken_1.RefreshToken();
    newRefreshToken.id = id;
    newRefreshToken.token = token;
    newRefreshToken.userId = userId;
    return newRefreshToken.save();
});
exports.createToken = createToken;
const deleteToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshTokenToDelete = yield refreshToken_1.RefreshToken.findOneBy({ id: id });
    if (!refreshTokenToDelete) {
        throw new Error("Token not found");
    }
    refreshTokenToDelete.remove();
});
exports.deleteToken = deleteToken;
