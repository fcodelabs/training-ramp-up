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
exports.LocalAuthGuard = void 0;
const jwt_1 = require("../util/jwt");
const models_1 = require("../models");
const db_1 = __importDefault(require("../util/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../util/config");
function LocalAuthGuard(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accessToken, refreshToken, userData } = req.cookies;
        const sessionRepository = db_1.default.getRepository(models_1.Session);
        //not authorized
        if (!accessToken && !refreshToken) {
            if (userData) {
                const session = yield sessionRepository.findOneBy({ id: userData.sessionId });
                if (session) {
                    yield sessionRepository.remove(session);
                }
            }
            res.cookie('userData', '', {
                maxAge: 0,
            });
            return next();
        }
        //verify access token if its still valid  
        const { payload, expired } = accessToken ? (0, jwt_1.verifyJWT)(accessToken) : { payload: null, expired: true };
        //For a valid access token
        if (payload) {
            console.log("granting access with the existing access token!");
            req.user = payload;
            const { iat, exp, userId } = payload, rest = __rest(payload, ["iat", "exp", "userId"]);
            res.cookie('userData', rest, {
                maxAge: 300000,
            });
            return next();
        }
        console.log("access token expired proceeding to refresh token!");
        //expired but valid access token
        const { payload: refresh } = expired && refreshToken ? (0, jwt_1.verifyJWT)(refreshToken) : { payload: null };
        if (!refresh) {
            console.log("refresh token expired, deleting sessions and navigating to log in page!");
            if (userData) {
                const session = yield sessionRepository.findOneBy({ id: userData.sessionId });
                if (session) {
                    yield sessionRepository.remove(session);
                }
            }
            res.cookie('userData', '', {
                maxAge: 0,
            });
            res.cookie('refreshToken', '', {
                maxAge: 0,
            });
            res.cookie('accessToken', '', {
                maxAge: 0,
            });
            return next();
        }
        console.log("refresh token valid proceeding to check session!");
        const session = yield sessionRepository.findOneBy({ id: refresh.sessionId });
        if (!session || !session.valid) {
            console.log("session is not valid, deleting cookies and navigating to log in page!");
            res.cookie('userData', '', {
                maxAge: 0,
            });
            res.cookie('refreshToken', '', {
                maxAge: 0,
            });
            res.cookie('accessToken', '', {
                maxAge: 0,
            });
            return next();
        }
        console.log("session is valid, proceeding to create new access token!");
        const { iat, exp, userId } = refresh, rest = __rest(refresh, ["iat", "exp", "userId"]);
        const tokenData = Object.assign({ userId }, rest);
        const newAccessToken = jsonwebtoken_1.default.sign(tokenData, config_1.config.jwt_secret, { expiresIn: '5m' });
        res.cookie('userData', rest, {
            maxAge: 300000,
        });
        res.cookie("accessToken", newAccessToken, {
            maxAge: 300000,
            httpOnly: true,
        });
        console.log("new access token created, granting access with a new access token!");
        req.user = (0, jwt_1.verifyJWT)(newAccessToken).payload;
        return next();
    });
}
exports.LocalAuthGuard = LocalAuthGuard;
