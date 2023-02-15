/* eslint-disable prettier/prettier */
export type CreateStudentParams = {
  PersonName: string;
  PersonGender: string;
  PersonAddress: string;
  PersonMobileNo: string;
  DateOfBirth: Date;
};
export type UpdateStudentParams = {
  PersonID: number;
  PersonName: string;
  PersonGender: string;
  PersonAddress: string;
  PersonMobileNo: string;
  DateOfBirth: Date;
};
