/* eslint-disable @typescript-eslint/no-explicit-any */

interface Student {
  ID: string;
  Name: string;
  Gender: string;
  Address: string;
  Number: string;
  Birthday: string;
  Age: string;
}

let students: Student[] = [];

export const getStudents = (req: any, res: any) => {
  res.send(students);
};

export const addStudent = (req: any, res: any) => {
  const ID = (students.length + 1).toString();
  const student = { ID, ...req.body };

  students.push(student);

  res.send(`Student with the id ${ID} added to database`);
};

export const deleteStudent = (req: any, res: any) => {
  const { ID } = req.params;
  students = students.filter((students) => students.ID !== ID);
  res.send(`Student with the id ${ID} deleted from database`);
};

export const updateStudent = (req: any, res: any) => {
  const { ID } = req.params;
  const { Name, Gender, Address, Number, Birthday, Age } = req.body;
  const student = students.find((students) => students.ID === ID);

  if (student) {
    if (Name) student.Name = Name;
    if (Gender) student.Gender = Gender;
    if (Address) student.Address = Address;
    if (Number) student.Number = Number;
    if (Birthday) student.Birthday = Birthday;
    if (Age) student.Age = Age;
  }

  res.send(`Student with the id ${ID} has been updated`);
};
