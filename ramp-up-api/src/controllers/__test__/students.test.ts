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
    newStudent.Name = "TEST";
    newStudent.Gender = "Male";
    newStudent.Address = "";
    newStudent.Number = 1;
    newStudent.Birthday = "";
    newStudent.Age = "";
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
    newStudent.Name = "TEST";
    newStudent.Gender = "Female";
    newStudent.Address = "";
    newStudent.Number = 1;
    newStudent.Birthday = "";
    newStudent.Age = "";
    test("UpdateStudent successful", async () => {
      await expect(
        AppDataSource.manager.update(Student, { Name: "TEST" }, newStudent)
      ).resolves.toBeTruthy();
    });
    test("UpdateStudent fail", async () => {
      await expect(
        AppDataSource.manager.update(Student, { Name: "TEST" }, newStudent)
      ).rejects.toBeInstanceOf(Error);
    });
  });
  describe("deleteStudent tests", () => {
    test("DeleteStudent successful", async () => {
      await expect(
        AppDataSource.manager.delete(Student, { Name: "TEST" })
      ).resolves.toBeTruthy();
    });
    test("DeleteStudent fail", async () => {
      await expect(
        AppDataSource.manager.delete(Student, { Name: "TEST" })
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
