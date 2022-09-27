"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
function verifyJWT(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt_secret);
        return { payload: decoded, expired: false };
    }
    catch (error) {
        return { payload: null, expired: true };
    }
}
exports.verifyJWT = verifyJWT;
