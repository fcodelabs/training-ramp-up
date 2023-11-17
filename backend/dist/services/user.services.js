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
exports.deleteUser = exports.updateUser = exports.createUser = exports.findUserByEmail = exports.getUser = exports.listUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../entity/user");
const listUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.User.find();
});
exports.listUsers = listUsers;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return user_1.User.findOneBy({
        id: id,
    });
});
exports.getUser = getUser;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return user_1.User.findOneBy({
        email: email,
    });
});
exports.findUserByEmail = findUserByEmail;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user.password = bcrypt_1.default.hashSync(user.password, 12);
    const { username, email, role, password } = user;
    const newUser = new user_1.User();
    newUser.username = username;
    newUser.email = email;
    newUser.role = role;
    newUser.password = password;
    return newUser.save();
});
exports.createUser = createUser;
const updateUser = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, role, password } = user;
    const userToUpdate = yield user_1.User.findOneBy({ id: id });
    if (!userToUpdate) {
        throw new Error("User not found");
    }
    userToUpdate.username = username;
    userToUpdate.email = email;
    userToUpdate.role = role;
    userToUpdate.password = password;
    return userToUpdate.save();
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userToDelete = yield user_1.User.findOneBy({ id: id });
    if (!userToDelete) {
        throw new Error("USer not found");
    }
    userToDelete.remove();
});
exports.deleteUser = deleteUser;
