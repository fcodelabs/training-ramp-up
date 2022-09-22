import { createSlice, current } from '@reduxjs/toolkit'
import { Student } from '../../interfaces';
const initialState:Student[]=[];

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudents:(state,action)=>{
      switch(action.payload.do){
        case "GET_STUDENTS":
          return action.payload.res.data.students;
        case "ADD_STUDENT":
          return [...state,action.payload.res.data.student];
        case "REMOVE_STUDENT":
          const id = action.payload.res.data.id;
          const newStudents = current(state).filter((student)=>student.id!==id); 
          return newStudents;
        case "UPDATE_STUDENT":
          const updatedStudent = action.payload.res.data.updatedStudent;
          const updatedStudents = current(state).map((student)=>{
            const newStudent = student.id!==updatedStudent.id?student:updatedStudent
            const configStudent = {
              id:newStudent.id,
              age:newStudent.age,
              address:newStudent.address,
              gender:newStudent.gender,
              mobileNo:newStudent.mobileNo,
              name:newStudent.name,
              dob: new Date(newStudent.dob)
            }
            return configStudent;
          });
          return updatedStudents;
      }
    },
    createStudent(state,action){},
    deleteStudent(state,action){},
    updateStudent(state,action){},
    getStudents(){},
  },
});

// Action creators are generated for each case reducer function
export const { setStudents,createStudent,deleteStudent,updateStudent,getStudents } = studentSlice.actions;

export const studentReducer =  studentSlice.reducer;