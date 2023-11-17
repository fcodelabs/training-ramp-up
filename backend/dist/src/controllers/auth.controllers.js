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
exports.refresh = exports.logout = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserServices = __importStar(require("../services/user.services"));
const AuthService = __importStar(require("../services/auth.service"));
const dotenv = __importStar(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { v4: uuidv4 } = require("uuid");
dotenv.config();
const accessSecret = process.env.JWT_ACCESS_SECRET || "";
const refreshSecret = process.env.JWT_REFRESH_SECRET || "";
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    const user = yield UserServices.findUserByEmail(email);
    if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
        return response.status(401).json({ message: "Invalid email or password" });
    }
    const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, userRole: user.role }, accessSecret, {
        expiresIn: "1d",
    });
    const id = uuidv4();
    const refreshToken = jsonwebtoken_1.default.sign({ id: id, userId: user.id, userRole: user.role }, refreshSecret, {
        expiresIn: "1d",
    });
    console.log("refreshToken", refreshToken);
    try {
        const tokenObject = { id: id, token: refreshToken, userId: user.id };
        yield AuthService.createToken(tokenObject);
        response.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true,
        });
        response.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 10 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true,
        });
        return response.status(200).json({ message: "Success login" });
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
});
exports.login = login;
const logout = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const list = {};
        const cookieHeader = (_a = request.headers) === null || _a === void 0 ? void 0 : _a.cookie;
        if (!cookieHeader)
            return list;
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
        const token = list["refreshToken"];
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, refreshSecret);
            AuthService.deleteToken(decodedToken.id);
            response.clearCookie("accessToken");
            response.clearCookie("refreshToken");
            return response.status(200).json({ message: "Logged out" });
        }
        catch (_b) {
            return response.status(401).json("Refresh token is not valid");
        }
    }
    catch (_c) {
        return response.status(401).json("Refresh token is not valid");
    }
});
exports.logout = logout;
const refresh = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.cookies.refreshToken;
    const verified = jsonwebtoken_1.default.verify(token, refreshSecret);
    if (verified) {
        try {
            const existingToken = yield AuthService.getToken(verified.id);
            if (existingToken) {
                const accessToken = jsonwebtoken_1.default.sign({ userId: verified.userId, userRole: verified.userRole }, accessSecret, {
                    expiresIn: "10m",
                });
                return response.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    maxAge: 10 * 60 * 1000,
                });
            }
            return response.status(404).json("Refresh token is not valid");
        }
        catch (error) {
            return response.status(500).json(error.message);
        }
    }
    return response.status(404).json("Refresh token is not valid");
});
exports.refresh = refresh;
