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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyJWTStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const models_1 = require("../models");
const db_1 = __importDefault(require("../util/db"));
const applyJWTStrategy = (passport) => {
    const options = {
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'NavyPenguinMariachi',
    };
    passport.use(new passport_jwt_1.Strategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        const userRepository = db_1.default.getRepository(models_1.User);
        const user = yield userRepository.findOneBy({ email: payload.email });
        if (!user) {
            return done({ error: "User unidentified!" }, false);
        }
        else {
            return done(null, user);
        }
    })));
};
exports.applyJWTStrategy = applyJWTStrategy;
