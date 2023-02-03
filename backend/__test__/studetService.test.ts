import { AppDataSource } from "../src/configs/DataSourceConfig";
import * as studentService from "../src/services/studentServices";
import { Student } from "../src/models/Student";

describe("Student Service test", () => {
    const student = {
        PersonName: "test",
        PersonSurname: "test",
        PersonPassword: "test",
        PersonRole: "test",
        PersonPhone: "test",
        PersonAddress: "test",
    } as unknown as Student;
    const createStudent = {
        PersonId: 1,
        PersonName: "test",
        PersonSurname: "test",
        PersonPassword: "test",
        PersonRole: "test",
        PersonPhone: "test",
        PersonAddress: "test",
    } as unknown as Student;
    describe("Create student service test", () => {
        it("test create student", async () => {
        const spyAppDataSource = jest.spyOn(AppDataSource.manager, "save");
        spyAppDataSource.mockResolvedValue(createStudent);
        try {
            const result = await studentService.createStudentService(student);
        } catch (e) {
            expect(e).toEqual(new Error("Error in creating student"));
        }
        spyAppDataSource.mockRestore();
        });
    });
    });
//