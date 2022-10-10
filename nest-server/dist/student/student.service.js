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
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.StudentService = void 0;
const common_1 = require('@nestjs/common');
const typeorm_1 = require('@nestjs/typeorm');
const student_entity_1 = require('../entity/student.entity');
const typeorm_2 = require('typeorm');
let StudentService = class StudentService {
  constructor(StudentRepo) {
    this.StudentRepo = StudentRepo;
  }
  async getAll() {
    return await this.StudentRepo.find();
  }
  async createPost(student) {
    return await this.StudentRepo.save(student);
  }
  async deleteOne(categoryId) {
    return await this.StudentRepo.delete(categoryId);
  }
  async updateStudent(studentId) {
    return await this.StudentRepo.update(studentId, student_entity_1.Student);
  }
};
StudentService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata('design:paramtypes', [typeorm_2.Repository]),
  ],
  StudentService,
);
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map
