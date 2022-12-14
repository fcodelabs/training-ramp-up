import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  student: [],
};
export const studentSlice = createSlice({
  name: 'studentSlice',
  initialState,
  reducers: {
    getStudentAction: () => {},
    saveStudentAction: (state, action) => {
      state.student = action.payload;
    },
    updateStudentAction: (state, action) => {},
    deleteStudentAction: (state, action) => {},
    addStudent: (state, action) => {},
  },
});
export const studentActions=studentSlice.actions;
export const {
  getStudentAction,
  saveStudentAction,
  updateStudentAction,
  deleteStudentAction,
  addStudent,
} = studentSlice.actions;
export default studentSlice.reducer;
