import { gql } from '@apollo/client';

export const GET_ALL_STUDENTS_QUERY = gql`
  query getAllStudents {
    getAllStudents {
      id
      name
      gender
      address
      dateOfBirth
      mobileNo
      age
      inEdit
      isArchive
    }
  }
`;
