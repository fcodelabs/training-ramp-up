'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Student = void 0;
const typeorm_1 = require('typeorm');
const graphql_1 = require('@nestjs/graphql');
let Student = class Student {};
__decorate(
  [(0, graphql_1.Field)(), (0, typeorm_1.PrimaryGeneratedColumn)('uuid')],
  Student.prototype,
  'id',
  void 0,
);
__decorate(
  [(0, graphql_1.Field)(), (0, typeorm_1.Column)()],
  Student.prototype,
  'name',
  void 0,
);
__decorate(
  [(0, graphql_1.Field)(), (0, typeorm_1.Column)()],
  Student.prototype,
  'gender',
  void 0,
);
__decorate(
  [(0, graphql_1.Field)(), (0, typeorm_1.Column)()],
  Student.prototype,
  'address',
  void 0,
);
__decorate(
  [(0, graphql_1.Field)(), (0, typeorm_1.Column)()],
  Student.prototype,
  'mobileNo',
  void 0,
);
__decorate(
  [(0, graphql_1.Field)((type) => Date), (0, typeorm_1.Column)()],
  Student.prototype,
  'dateOfBirth',
  void 0,
);
__decorate(
  [(0, graphql_1.Field)(), (0, typeorm_1.Column)()],
  Student.prototype,
  'inEdit',
  void 0,
);
__decorate(
  [(0, graphql_1.Field)((type) => graphql_1.Int), (0, typeorm_1.Column)()],
  Student.prototype,
  'age',
  void 0,
);
__decorate(
  [(0, graphql_1.Field)(), (0, typeorm_1.Column)()],
  Student.prototype,
  'isArchive',
  void 0,
);
Student = __decorate(
  [
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)(), //use for query
  ],
  Student,
);
exports.Student = Student;
