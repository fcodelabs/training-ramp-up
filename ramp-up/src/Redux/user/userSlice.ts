import { randomCreatedDate } from '@mui/x-data-grid-generator'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type User = {
    id: number
    uid: number
    name: string
    gender: string
    address: string
    mobile: string
    birthday: Date
    age: number
}

type initialDataType = {
    isLoading: boolean
    rows: User[]
}

const initialState: initialDataType = {
    isLoading: false,
    rows: [
        {
            id: 1,
            uid: 1,
            name: 'thambara',
            gender: 'Male',
            address: 'kk,ksksd,sdsa',
            mobile: '0716272786',
            birthday: randomCreatedDate(),
            age: 20,
        },
        {
            id: 2,
            uid: 2,
            name: 'sahass',
            gender: 'Male',
            address: 'kk,ksksd,sdsa',
            mobile: '0716272787',
            birthday: randomCreatedDate(),
            age: 30,
        },
        {
            id: 3,
            uid: 3,
            name: 'sahasaka',
            gender: 'Male',
            address: 'kksassaf,ksksd,sdsa',
            mobile: '0716272787',
            birthday: randomCreatedDate(),
            age: 30,
        },
    ],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUsers: (state) => {
            state.isLoading = false
        },
        fetchUsersFailure: (state) => {
            state.isLoading = true
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.rows.push(action.payload)
        },
        discardUser: (state, action: PayloadAction<number>) => {
            state.rows = state.rows.filter(
                (user) => user.uid !== action.payload
            )
        },
        saveUser: (state, action: PayloadAction<User>) => {
            state.rows = state.rows.map((user) =>
                user.uid === action.payload.uid ? action.payload : user
            )
        },
        updateUser: (
            state,
            action: PayloadAction<{ uid: number; updates: Partial<User> }>
        ) => {
            state.rows = state.rows.map((user) =>
                user.uid === action.payload.uid
                    ? { ...user, ...action.payload.updates }
                    : user
            )
        },
    },
})

export const {
    fetchUsers,
    fetchUsersFailure,
    addUser,
    discardUser,
    saveUser,
    updateUser,
} = userSlice.actions

export default userSlice.reducer
