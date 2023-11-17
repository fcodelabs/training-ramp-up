"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthController = __importStar(require("../controllers/auth.controllers"));
const cookieParser = require("cookie-parser");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const accessSecret = process.env.JWT_ACCESS_SECRET || "";
const AuthenticationMiddleware = (allowedUser) => (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const list = {};
        const cookieHeader = (_a = request.headers) === null || _a === void 0 ? void 0 : _a.cookie;
        if (cookieHeader == undefined)
            return response.status(401).json({ message: "Unauthorized access" });
        cookieHeader.split(`;`).forEach(function (cookie) {
            let [name, ...rest] = cookie.split(`=`);
            name = name === null || name === void 0 ? void 0 : name.trim();
            if (!name)
                return;
            const value = rest.join(`=`).trim();
            if (!value)
                return;
            list[name] = decodeURIComponent(value);
        });
        const token = list["accessToken"];
        if (!token)
            return response.status(401).json({ message: "Unauthorized access" });
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, accessSecret);
            if (decodedToken.userRole === "ADMIN") {
                if (allowedUser === "USER") {
                    return next();
                }
            }
            if (decodedToken.userRole === allowedUser) {
                return next();
            }
            else {
                return response.status(401).json({ message: "Unauthorized access" });
            }
        }
        catch (error) {
            if (error.name === "TokenExpiredError") {
                return AuthController.refresh;
            }
            else {
                return response.status(401).json({ message: "Unauthorized access" });
            }
        }
    }
    catch (_b) {
        return response.status(401).json({ message: "Unauthorized access" });
    }
});
exports.AuthenticationMiddleware = AuthenticationMiddleware;
