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
exports.deserializeUser = void 0;
const jwt_1 = require("../util/jwt");
const models_1 = require("../models");
const db_1 = __importDefault(require("../util/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function deserializeUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accessToken, refreshToken } = req.cookies;
        const sessionRepository = db_1.default.getRepository(models_1.Session);
        //not authorized
        if (!accessToken) {
            return next();
        }
        //verify access token if its still valid  
        const { payload, expired } = (0, jwt_1.verifyJWT)(accessToken);
        console.log(payload);
        //For a valid access token
        if (payload) {
            req.user = payload;
            return next();
        }
        //expired but valid access token
        const { payload: refresh } = expired && refreshToken ? (0, jwt_1.verifyJWT)(refreshToken) : { payload: null };
        if (!refresh) {
            return next();
        }
        const session = yield sessionRepository.findOneBy({ email: refresh.email });
        if (!session) {
            return next();
        }
        const { iat, exp } = refresh, rest = __rest(refresh, ["iat", "exp"]);
        const newAccessToken = jsonwebtoken_1.default.sign(rest, "NavyPenguinMariachi", { expiresIn: '5s' });
        res.cookie("accessToken", newAccessToken, {
            maxAge: 3.154e10,
            httpOnly: true,
        });
        console.log("new access token created through refresh token!");
        req.user = (0, jwt_1.verifyJWT)(newAccessToken).payload;
        return next();
    });
}
exports.deserializeUser = deserializeUser;
