"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const student_module_1 = require("./student/student.module");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("./entity/student.entity");
const user_module_1 = require("./user/user.module");
const user_entity_1 = require("./entity/user.entity");
const student_controller_1 = require("./student/student.controller");
const admin_middleware_1 = require("./middleware/admin.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(admin_middleware_1.default)
            .exclude({ path: 'student', method: common_1.RequestMethod.GET }, 'student/(.*)')
            .forRoutes(student_controller_1.StudentController);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            student_module_1.StudentModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '123Da@',
                database: 'nest-api',
                entities: [student_entity_1.Student, user_entity_1.User],
                synchronize: true,
            }),
            user_module_1.UserModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map