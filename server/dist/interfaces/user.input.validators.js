"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginInputDataValidator = exports.signupInputDataValidator = void 0;
const zod_1 = require("zod");
//validate user signup data
exports.signupInputDataValidator = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(6, { message: "Password must be 6 or more characters long" }),
});
//validate user login data
exports.loginInputDataValidator = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(6, { message: "Password must be 6 or more characters long" }),
});
