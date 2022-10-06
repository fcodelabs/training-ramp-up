import { AppDataSource } from "../../data-source";
import { Student } from "../../entity/Student";

describe("student tests", () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(() => {
        console.log("Data Source has been initialized!");
      })
      .catch((error) => console.log(error));
  }, 10000);
  describe("getStudents tests", () => {
    test("GetStudents successful", async () => {
      await expect(AppDataSource.manager.find(Student)).resolves.toBeInstanceOf(
        Array
      );
    });
    test("GetStudents fail", async () => {
      await expect(AppDataSource.manager.find(Student)).rejects.toBeInstanceOf(
        Error
      );
    });
  });
  describe("addStudent tests", () => {
    const newStudent = new Student();
    newStudent.name = "TEST";
    newStudent.gender = "Male";
    newStudent.address = "";
    newStudent.number = 1;
    newStudent.birthday = "";
    newStudent.age = "";
    test("Addstudent successful", async () => {
      await expect(
        AppDataSource.manager.save(newStudent)
      ).resolves.toBeTruthy();
    });
    test("Addstudent fail", async () => {
      await expect(
        AppDataSource.manager.save(newStudent)
      ).rejects.toBeInstanceOf(Error);
    });
  });
  describe("updateStudent tests", () => {
    const newStudent = new Student();
    newStudent.name = "TEST";
    newStudent.gender = "Female";
    newStudent.address = "";
    newStudent.number = 1;
    newStudent.birthday = "";
    newStudent.age = "";
    test("UpdateStudent successful", async () => {
      await expect(
        AppDataSource.manager.update(Student, { name: "TEST" }, newStudent)
      ).resolves.toBeTruthy();
    });
    test("UpdateStudent fail", async () => {
      await expect(
        AppDataSource.manager.update(Student, { name: "TEST" }, newStudent)
      ).rejects.toBeInstanceOf(Error);
    });
  });
  describe("deleteStudent tests", () => {
    test("DeleteStudent successful", async () => {
      await expect(
        AppDataSource.manager.delete(Student, { name: "TEST" })
      ).resolves.toBeTruthy();
    });
    test("DeleteStudent fail", async () => {
      await expect(
        AppDataSource.manager.delete(Student, { name: "TEST" })
      ).rejects.toBeInstanceOf(Error);
    });
  });
  afterAll(async () => {
    await AppDataSource.destroy()
      .then(() => {
        console.log("Data Source has been destroyed");
      })
      .catch((error) => console.log(error));
  }, 10000);
});
