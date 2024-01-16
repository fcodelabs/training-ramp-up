import { randomCreatedDate } from '@mui/x-data-grid-generator';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GridRowsProp } from '@mui/x-data-grid';

type User = {
    id: number,
    uid: number,
    name: string,
    gender: string,
    address: string,
    mobile: string,
    birthday: Date,
    age: number
    isNew?: boolean
}

type initialDataType = {
    isLoading: boolean,
    rows: GridRowsProp
}


const initialState: initialDataType = {
    isLoading: false,
    rows: [
    { id: 1, uid: 1, name: 'thambara', gender: 'Male', address: 'kk,ksksd,sdsa', mobile: '0716272786', birthday: randomCreatedDate(), age: 20, isNew:false },
    { id: 2, uid: 2, name: 'sahass', gender: 'Male', address: 'kk,ksksd,sdsa', mobile: '0716272787', birthday: randomCreatedDate(), age: 30, isNew:false },
]
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUsers: (state, action: PayloadAction<String>) => {
            state.isLoading = false;
        },
        fetchUsersFailure: (state) => {
            state.isLoading = true;
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.rows.push(action.payload);
        },
        discardUser: (state, action: PayloadAction<number>) => {
            state.rows = state.rows.filter((user) => user.uid !== action.payload);
        },
        saveUser: (state, action: PayloadAction<User>) => {
            state.rows = state.rows.map((user) => user.uid === action.payload.uid ? action.payload : user);
        },
        updateName: (state, action: PayloadAction<{ uid: number, name: string }>) => {
            state.rows = state.rows.map((user) => user.uid === action.payload.uid ? { ...user, name: action.payload.name } : user);
        },
        updateAddress: (state, action: PayloadAction<{ uid: number, address: string }>) => {
            state.rows = state.rows.map((user) => user.uid === action.payload.uid ? { ...user, address: action.payload.address } : user);
        },
        updateMobile: (state, action: PayloadAction<{ uid: number, mobile: string }>) => {
            state.rows = state.rows.map((user) => user.uid === action.payload.uid ? { ...user, mobile: action.payload.mobile } : user);
        },
        updateBirthday: (state, action: PayloadAction<{ uid: number, birthday: Date }>) => {
            state.rows = state.rows.map((user) => user.uid === action.payload.uid ? { ...user, birthday: action.payload.birthday } : user);
        },
        updateAge: (state, action: PayloadAction<{ uid: number, age: number }>) => {
            state.rows = state.rows.map((user) => user.uid === action.payload.uid ? { ...user, age: action.payload.age } : user);
        },        
        updateGender: (state, action: PayloadAction<{ uid: number, gender: string }>) => {
            state.rows = state.rows.map((user) => user.uid === action.payload.uid ? { ...user, gender: action.payload.gender } : user);},

        updateUser: (state, action: PayloadAction<{ uid: number, updates: Partial<User> }>) => {
            state.rows = state.rows.map((user) => user.uid === action.payload.uid ? { ...user, ...action.payload.updates } : user);
        }
}})

export const { fetchUsers, fetchUsersFailure, addUser, discardUser, saveUser, updateName, updateAge, updateAddress, updateBirthday, updateGender, updateMobile, updateUser } = userSlice.actions;

export default userSlice.reducer;

