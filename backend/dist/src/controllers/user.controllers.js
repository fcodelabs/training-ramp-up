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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserdetail = exports.getUser = exports.getUsers = void 0;
const express_validator_1 = require("express-validator");
const UserService = __importStar(require("../services/user.services"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let jwtSecretKey = process.env.JWT_ACCESS_SECRET || "";
// GET: List of all Users
const getUsers = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserService.listUsers();
        return response.status(200).json(users);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
});
exports.getUsers = getUsers;
// GET: A single User by ID
const getUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        const user = yield UserService.getUser(id);
        if (user) {
            return response.status(200).json(user);
        }
        return response.status(404).json("User could not be found");
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
});
exports.getUser = getUser;
const accessSecret = process.env.JWT_ACCESS_SECRET || "";
const getUserdetail = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
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
            const id = decodedToken.userId;
            try {
                const user = yield UserService.getUser(id);
                if (user) {
                    return response.status(200).json(user);
                }
                return response.status(404).json("User could not be found");
            }
            catch (error) {
                return response.status(500).json(error.message);
            }
        }
        catch (_b) {
            return response.status(401).json({ message: "Unauthorized access" });
        }
    }
    catch (_c) {
        return response.status(401).json({ message: "Unauthorized access" });
    }
});
exports.getUserdetail = getUserdetail;
// POST: Create an User
const createUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        const user = request.body;
        const newUser = yield UserService.createUser(user);
        return response.status(201).json(newUser);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
});
exports.createUser = createUser;
// PUT: Updating an User
const updateUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const id = request.params.id;
    try {
        const user = request.body;
        const updateUser = yield UserService.updateUser(user, id);
        return response.status(200).json(updateUser);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
});
exports.updateUser = updateUser;
// DELETE: Delete an User based on the id
const deleteUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        yield UserService.deleteUser(id);
        return response.status(204).json("User has been successfully deleted");
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
});
exports.deleteUser = deleteUser;
