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
exports.loginStatus = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const services_1 = require("../services");
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.signupUser)(req.body);
        if (result.error) {
            res.status(400);
            res.send({ message: "Signup Failed!", error: result.error });
            return;
        }
        res.cookie('accessToken', result.accessToken, {
            maxAge: 300000,
            httpOnly: true,
        });
        res.cookie('refreshToken', result.refreshToken, {
            maxAge: 3.154e10,
            httpOnly: true,
        });
        res.cookie('userData', result.userData, {
            maxAge: 300000,
        });
        res.status(200);
        res.send({ message: result.message });
        return;
    });
}
exports.registerUser = registerUser;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.signinUser)(req.body);
        if (result.error) {
            res.status(400);
            res.send({ message: "Login Failed!", error: result.error });
            return;
        }
        res.cookie('accessToken', result.accessToken, {
            maxAge: 300000,
            httpOnly: true,
        });
        res.cookie('refreshToken', result.refreshToken, {
            maxAge: 3.154e10,
            httpOnly: true,
        });
        res.cookie('userData', result.userData, {
            maxAge: 300000,
        });
        res.status(200);
        res.send({ message: result.message });
        return;
    });
}
exports.loginUser = loginUser;
function logoutUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let sessionId = req.params.sessionId;
        const result = yield (0, services_1.signoutUser)(sessionId);
        if (result.error) {
            res.status(400);
            res.send({ message: "Log out Failed!", error: result.error });
            return;
        }
        res.cookie("accessToken", "", {
            maxAge: 0,
            httpOnly: true
        });
        res.cookie("refreshToken", "", {
            maxAge: 0,
            httpOnly: true
        });
        res.cookie("userData", "", {
            maxAge: 0,
        });
        res.status(200);
        res.send({ message: result.message });
        return;
    });
}
exports.logoutUser = logoutUser;
function loginStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.user) {
            res.status(400);
            res.send({ message: "Unauthorized", error: "User currently not logged in!" });
            return;
        }
        res.status(200);
        res.send(req.user);
        return;
    });
}
exports.loginStatus = loginStatus;
