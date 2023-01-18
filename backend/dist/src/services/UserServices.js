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
exports.deleteAllUserService = exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUserByIdService = exports.getAllUsersService = void 0;
const DataSourceConfig_1 = require("../configs/DataSourceConfig");
const User_1 = require("../models/User");
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = DataSourceConfig_1.AppDataSource.getRepository(User_1.User);
    const allrecords = yield userRepo.find();
    return allrecords;
});
exports.getAllUsersService = getAllUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = DataSourceConfig_1.AppDataSource.getRepository(User_1.User);
    const user = yield userRepo.findOneBy({ PersonID: id });
    return user;
});
exports.getUserByIdService = getUserByIdService;
const createUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = DataSourceConfig_1.AppDataSource.getRepository(User_1.User);
    const userInsert = yield userRepo.save(user);
    return userInsert;
});
exports.createUserService = createUserService;
const updateUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = DataSourceConfig_1.AppDataSource.getRepository(User_1.User);
    const userUpdate = yield userRepo.save(user);
    return userUpdate;
});
exports.updateUserService = updateUserService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = DataSourceConfig_1.AppDataSource.getRepository(User_1.User);
    const user = yield userRepo.findOneBy({ PersonID: id });
    if (user !== null) {
        const userDelete = yield userRepo.remove(user);
        return userDelete;
    }
    else {
        return null;
    }
});
exports.deleteUserService = deleteUserService;
const deleteAllUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = DataSourceConfig_1.AppDataSource.getRepository(User_1.User);
    const allrecords = yield userRepo.find();
    const userDelete = yield userRepo.remove(allrecords);
    return userDelete;
});
exports.deleteAllUserService = deleteAllUserService;
