"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyJWT(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "NavyPenguinMariachi");
        return { payload: decoded, expired: false };
    }
    catch (error) {
        return { payload: null, expired: true };
    }
}
exports.verifyJWT = verifyJWT;
