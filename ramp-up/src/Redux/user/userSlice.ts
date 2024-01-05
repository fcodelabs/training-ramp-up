import { randomCreatedDate } from '@mui/x-data-grid-generator';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type User = {
    id: number,
    name: string, 
    gender: string, 
    address: string, 
    mobile: string, 
    birthday: Date, 
    age:number
}

type initialDataType = {
    isLoading: boolean,
    rows: User[]
}


const initialState: initialDataType = {
    isLoading: false,
    rows: [{ id: 1, name: 'thma', gender: 'World', address: 'Male', mobile: 'Kathmandu', birthday: randomCreatedDate(), age: 20 }]
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUsers: (state, action:PayloadAction<String>) => {
            state.isLoading = false;
        },

        fetchUsersFailure: (state) => {
            state.isLoading = true;
        },
        addUser: (state, action: PayloadAction<User> ) => {
            state.rows.push(action.payload);
        }
        
    }
})

export const { fetchUsers, fetchUsersFailure, addUser } = userSlice.actions;

export default userSlice.reducer;

