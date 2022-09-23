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
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("./user.service");
const argon = __importStar(require("argon2"));
const User_1 = require("../models/User");
jest.mock('argon2', () => {
    return Object.assign({ __esModule: true }, jest.requireActual('argon2'));
});
describe("UserService", () => {
    //Sign In User Service Tests
    describe("signinUser", () => {
        const logInData = {
            email: "fake_email@fake.com",
            password: "fake_password"
        };
        const user = {
            email: "fake_email@fake.com",
            password: "fake_password",
            id: 1,
            name: "fake_name",
            role: User_1.Role.guest
        };
        const session = {
            valid: true,
            name: "fake_name",
            email: "fake_email",
            id: "fake_id"
        };
        const userData = {
            sessionId: session.id,
            email: session.email,
            name: session.name,
            role: User_1.Role.guest
        };
        //positive test
        test("Log in user success, should return user with tokens", () => __awaiter(void 0, void 0, void 0, function* () {
            user_service_1.userRepository.findOneBy = jest.fn().mockReturnValue(user);
            user_service_1.sessionRepository.save = jest.fn().mockReturnValue(session);
            const spyHash = jest.spyOn(argon, 'verify').mockResolvedValue(true);
            const res = yield (0, user_service_1.signinUser)(logInData);
            expect(res.message).toEqual("Login Successfull!");
            expect(res.userData).toEqual(userData);
            expect(res.refreshToken).toBeDefined();
            expect(res.accessToken).toBeDefined();
            spyHash.mockRestore();
        }));
        //negative test
        test("Log in failed, should return an error message", () => __awaiter(void 0, void 0, void 0, function* () {
            user_service_1.userRepository.findOneBy = jest.fn().mockImplementationOnce(() => undefined);
            const res = yield (0, user_service_1.signinUser)(logInData);
            expect(res).toEqual({ error: "User not found!" });
        }));
    });
    //Sign Up User Service Tests
    describe("signupUser", () => {
        const signUpData = {
            name: "fake_name",
            email: "fake_email@fake.com",
            password: "fake_password"
        };
        const user = {
            email: "fake_email@fake.com",
            password: "fake_hash_password",
            id: 1,
            name: "fake_name",
            role: User_1.Role.guest
        };
        const session = {
            valid: true,
            name: "fake_name",
            email: "fake_email",
            id: "fake_id"
        };
        const userData = {
            sessionId: session.id,
            email: session.email,
            name: session.name,
            role: User_1.Role.guest
        };
        //positive test
        test("Sign up user success, should return user with tokens", () => __awaiter(void 0, void 0, void 0, function* () {
            user_service_1.userRepository.save = jest.fn().mockReturnValue(user);
            user_service_1.sessionRepository.save = jest.fn().mockReturnValue(session);
            const spyHash = jest.spyOn(argon, 'hash').mockResolvedValue("fake_hash_password");
            const res = yield (0, user_service_1.signupUser)(signUpData);
            expect(res.message).toEqual("Sign Up Successfull!");
            expect(res.userData).toEqual(userData);
            expect(res.refreshToken).toBeDefined();
            expect(res.accessToken).toBeDefined();
            spyHash.mockRestore();
        }));
        //negative test
        test("Sign up failed, should return an error message", () => __awaiter(void 0, void 0, void 0, function* () {
            user_service_1.userRepository.save = jest.fn().mockImplementationOnce(() => undefined);
            const res = yield (0, user_service_1.signupUser)(signUpData);
            expect(res).toEqual({ error: "Failed to create user entity!" });
        }));
    });
    //Sign Out User Service Tests
    describe("signoutUser", () => {
        const sessionId = "fake_id";
        const session = {
            valid: true,
            name: "fake_name",
            email: "fake_email",
            id: "fake_id"
        };
        //positive test
        test("Sign out user success, should return success message after deleting the session", () => __awaiter(void 0, void 0, void 0, function* () {
            user_service_1.sessionRepository.findOneBy = jest.fn().mockReturnValue(session);
            user_service_1.sessionRepository.remove = jest.fn().mockReturnValue(session);
            const res = yield (0, user_service_1.signoutUser)(sessionId);
            expect(res.message).toEqual("Successfully logged out!");
        }));
        //negative test
        test("Sign out failed, should return an error message", () => __awaiter(void 0, void 0, void 0, function* () {
            user_service_1.sessionRepository.findOneBy = jest.fn().mockImplementationOnce(() => { throw new Error('Not Found!'); });
            const res = yield (0, user_service_1.signoutUser)(sessionId);
            expect(res.error).toEqual("Failed to log out!");
        }));
    });
});
