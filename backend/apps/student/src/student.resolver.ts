import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { StudentCreateDto } from "./dto/create-student.input";
import { Student } from "./entities/student.entity";
import { StudentService } from "./student.service";

@Resolver(() => Student)
export class StudentResolver {
    constructor(private studentService: StudentService) { }

    @Query(() => [Student], { name: "getAllStudednts" })
    findAll() {
        return this.studentService.findAll();
    }

    @Mutation(() => Student, { name: "createStudent" })
    create(@Args('studentCreateDto') studentCreateDto: StudentCreateDto) {
        return this.studentService.create(studentCreateDto)
    }
}