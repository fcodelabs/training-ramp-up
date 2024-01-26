import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStudent {
    id: number,
    name: string;
    gender: string;
    address: string;
    mobileNumber: string;
    birthday: Date;
    age: number;
}

const studentsSlice = createSlice({
    name: 'students',
    initialState: [
        {id: 1, name:'Sudarshan', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday: new Date('2000.04.17'), age:31},
        {id: 2, name:'Amila', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
        {id: 3, name:'Buddika', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2010-04-17'), age:31},
        {id: 4, name:'Charith', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
        {id: 5, name:'Dasun', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
        {id: 6, name:'Eshan', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
        {id: 7, name:'Fernando', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
        {id: 8, name:'Gandika', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
        {id: 9, name:'Hansaka', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
        {id: 10, name:'Ishan', gender:'male', address:'Bangalore', mobileNumber:'1234567890', birthday:new Date('2000-04-17'), age:31},
        ] as IStudent[],
    reducers: {
        addStudent: (state, action) => {
            state.push(action.payload);
        },
        editStudent: (state, action: PayloadAction<IStudent>) => {
            const index = state.findIndex((student) => student.id === action.payload.id);
            if (index !== -1) {
              state[index] = action.payload;
            }
          },
        removeStudent: (state, action: PayloadAction<IStudent>) => {
            return state.filter((student) => student !== action.payload);
        },
    },
});

export const { addStudent, editStudent, removeStudent } = studentsSlice.actions;
export default studentsSlice.reducer;
