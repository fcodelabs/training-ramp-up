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
const user_controller_1 = require("./user.controller");
const UserService = __importStar(require("../services/user.service"));
const User_1 = require("../models/User");
describe("UserController", () => {
    //Log In User Tests
    describe("logInUser", () => {
        // login success result from service
        const loggedInUser = {
            message: "Login Successfull!",
            userData: {
                sessionId: "fake_session_id",
                name: "fake_name",
                email: "fake_email@fake.com",
                role: User_1.Role.guest
            },
            refreshToken: "fake_refresh_token",
            accessToken: "fake_access_token",
            error: undefined
        };
        // login failed result from service
        const logInUserError = {
            error: "User not found!",
        };
        const request = {
            body: {
                email: 'fake_username',
                password: 'fake_password'
            }
        };
        const response = {
            status: jest.fn((x) => x),
            send: jest.fn((x) => x),
            cookie: jest.fn((x) => x)
        };
        //positive test
        test("Should send a status of 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(UserService, "signinUser").mockResolvedValue(loggedInUser);
            yield (0, user_controller_1.loginUser)(request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.send).toHaveBeenCalledWith({ message: "Login Successfull!" });
            expect(response.cookie).toHaveBeenCalledTimes(3);
            spy.mockRestore();
        }));
        //negative test
        test("Should send a status of 400", () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(UserService, "signinUser").mockResolvedValue(logInUserError);
            yield (0, user_controller_1.loginUser)(request, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.send).toHaveBeenCalledWith({
                message: "Login Failed!",
                error: "User not found!",
                userData: undefined,
                accessToken: undefined,
                refreshToken: undefined
            });
            spy.mockRestore();
        }));
    });
    //Register Up User Tests
    describe("registerUser", () => {
        // login success result from service
        const registeredUser = {
            message: "Sign Up Successfull!",
            userData: {
                sessionId: "fake_session_id",
                name: "fake_name",
                email: "fake_email@fake.com",
                role: User_1.Role.guest
            },
            refreshToken: "fake_refresh_token",
            accessToken: "fake_access_token",
            error: undefined
        };
        // login failed result from service
        const registerUserError = {
            error: "Failed to register user!",
        };
        const request = {
            body: {
                email: 'fake_username',
                password: 'fake_password'
            }
        };
        const response = {
            status: jest.fn((x) => x),
            send: jest.fn((x) => x),
            cookie: jest.fn((x) => x)
        };
        //positive test
        test("Should send a status of 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(UserService, "signupUser").mockResolvedValue(registeredUser);
            yield (0, user_controller_1.registerUser)(request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.send).toHaveBeenCalledWith({ message: "Sign Up Successfull!" });
            expect(response.cookie).toHaveBeenCalledTimes(3);
            spy.mockRestore();
        }));
        //negative test
        test("Should send a status of 400", () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(UserService, "signupUser").mockResolvedValue(registerUserError);
            yield (0, user_controller_1.registerUser)(request, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.send).toHaveBeenCalledWith({
                message: "Signup Failed!",
                error: "Failed to register user!",
                userData: undefined,
                accessToken: undefined,
                refreshToken: undefined
            });
            spy.mockRestore();
        }));
    });
    //Log Out Out User Tests
    describe("logoutUser", () => {
        // logout success result from service
        const loggedOutUser = {
            message: "Successfully logged out!",
            error: undefined
        };
        // logout failed result from service
        const logOutUserError = {
            error: "Session doesn't exist!",
            message: undefined
        };
        const request = {
            params: {
                sessionId: 'fake_sessionId',
            }
        };
        const response = {
            status: jest.fn((x) => x),
            send: jest.fn((x) => x),
            cookie: jest.fn((x) => x)
        };
        //positive test
        test("Should send a status of 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(UserService, "signoutUser").mockResolvedValue(loggedOutUser);
            yield (0, user_controller_1.logoutUser)(request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.send).toHaveBeenCalledWith({ message: "Successfully logged out!" });
            expect(response.cookie).toHaveBeenCalledTimes(3);
            spy.mockRestore();
        }));
        //negative test
        test("Should send a status of 400", () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(UserService, "signoutUser").mockResolvedValue(logOutUserError);
            yield (0, user_controller_1.logoutUser)(request, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.send).toHaveBeenCalledWith({
                message: "Log out Failed!",
                error: "Session doesn't exist!",
            });
            spy.mockRestore();
        }));
    });
    //Check Log In Status Tests
    describe("loginStatus", () => {
        const loggedIn_request = {
            user: {
                sessionId: "fake_session_id",
                name: "fake_name",
                email: "fake_email@fake.com",
                role: User_1.Role.guest
            }
        };
        const loggedOut_request = {};
        const response = {
            status: jest.fn((x) => x),
            send: jest.fn((x) => x),
        };
        //positive test
        test("User is logged in, should send a status of 200", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, user_controller_1.loginStatus)(loggedIn_request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.send).toHaveBeenCalledWith(loggedIn_request.user);
        }));
        //negative test
        test("User haven't logged in, should send a status of 400", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, user_controller_1.loginStatus)(loggedOut_request, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.send).toHaveBeenCalledWith({
                message: "Unauthorized",
                error: "User currently not logged in!"
            });
        }));
    });
});
