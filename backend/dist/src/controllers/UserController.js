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
exports.deleteAllUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const UserServices_1 = require("../services/UserServices");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("getAllUsers");
        const allrecords = yield (0, UserServices_1.getAllUsersService)();
        res.send(allrecords);
    }
    catch (err) {
        // console.log(err);
        res.send(err);
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const user = yield (0, UserServices_1.getUserByIdService)(id);
        res.send(user);
    }
    catch (err) {
        res.send(err);
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const userInsert = yield (0, UserServices_1.createUserService)(user);
        res.send(userInsert);
    }
    catch (err) {
        res.send(err);
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const userUpdate = yield (0, UserServices_1.updateUserService)(user);
        res.send(userUpdate);
    }
    catch (err) {
        res.send(err);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const userDelete = yield (0, UserServices_1.deleteUserService)(id);
        res.send(userDelete);
    }
    catch (err) {
        res.send(err);
    }
});
exports.deleteUser = deleteUser;
const deleteAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDelete = yield (0, UserServices_1.deleteAllUserService)();
        res.send(userDelete);
    }
    catch (err) {
        res.send(err);
    }
});
exports.deleteAllUser = deleteAllUser;
