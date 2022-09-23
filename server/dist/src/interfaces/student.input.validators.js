"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentDataValidator = void 0;
const zod_1 = require("zod");
var Gender;
(function (Gender) {
    Gender["Female"] = "Female";
    Gender["Male"] = "Male";
    Gender["Other"] = "Other";
})(Gender || (Gender = {}));
//validate user signup data
exports.studentDataValidator = zod_1.z.object({
    name: zod_1.z.string().min(1),
    gender: zod_1.z.nativeEnum(Gender),
    address: zod_1.z.string().min(1),
    mobileNo: zod_1.z.number().int().positive().gt(99999999).lte(999999999),
    dob: zod_1.z.union([zod_1.z.date(), zod_1.z.string()]),
    age: zod_1.z.number().int().nonnegative().lte(120)
});
