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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signoutUser = exports.signinUser = exports.signupUser = void 0;
const models_1 = require("../models");
const db_1 = __importDefault(require("../util/db"));
const argon = __importStar(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signupUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hash = yield argon.hash(data.password);
            const user = new models_1.User();
            user.name = data.name;
            user.email = data.email;
            user.password = hash;
            const userRepository = db_1.default.getRepository(models_1.User);
            const newUser = yield userRepository.save(user);
            if (!newUser) {
                return { message: "Faild to register user !" };
            }
            const { password } = newUser, rest = __rest(newUser, ["password"]);
            return { message: "User registered successfully !", data: rest };
        }
        catch (error) {
            return { error };
        }
    });
}
exports.signupUser = signupUser;
function signinUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userRepository = db_1.default.getRepository(models_1.User);
            const sessionRepository = db_1.default.getRepository(models_1.Session);
            console.log(data);
            const user = yield userRepository.findOneBy({ email: data.email });
            if (!user) {
                return { message: "User not found!" };
            }
            const pwMatches = yield argon.verify(user.password, data.password);
            if (!pwMatches) {
                return { message: "Incorrect Credentials!" };
            }
            const { password } = user, rest = __rest(user, ["password"]);
            const accessToken = jsonwebtoken_1.default.sign(rest, "NavyPenguinMariachi", { expiresIn: '5s' });
            const refreshToken = jsonwebtoken_1.default.sign(rest, "NavyPenguinMariachi", { expiresIn: '1y' });
            const newSession = yield sessionRepository.save({ email: rest.email, name: rest.name });
            const userData = { email: newSession.email, name: newSession.name, role: user.role };
            return { message: "Login Successfull!", session: userData, refreshToken, accessToken };
        }
        catch (error) {
            return { error };
        }
    });
}
exports.signinUser = signinUser;
function signoutUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sessionRepository = db_1.default.getRepository(models_1.Session);
            const session = sessionRepository.findOneBy({ email: data.email });
            const invalidSession = sessionRepository.save(Object.assign(Object.assign({}, session), { valid: false }));
            return { session: invalidSession };
        }
        catch (error) {
            return { error };
        }
    });
}
exports.signoutUser = signoutUser;
