import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Student,StudentInitialState} from "../../utils/types";
import {SortDescriptor} from "@progress/kendo-data-query";




const initialState: StudentInitialState = {
    editId: null,
    dataFetchingRequested: false,
    dataEditingRequested: false,
    dataAddRequested: false,
    dataRemoveRequested:false,
    data: [],
    sort: [{field: 'id', dir: 'asc'}],
    newAdded: false

}

export const studentSlice = createSlice(
    {
        name: "studentData",
        initialState,
        reducers: {
            changeSort: (state, action: PayloadAction<Array<SortDescriptor>>) => {
                state.sort = action.payload
            },
            addNew: (state, action: PayloadAction<Student>) => {
                state.data.push(action.payload);
                state.dataAddRequested = false;
            },
            editData: (state, action: PayloadAction<Student[]>) => {
                try {
                    state.data = action.payload;
                    state.dataEditingRequested = false;
                } catch (error: any) {
                    state.dataEditingRequested = false;
                }

            },
            changeNewAdded: (state, action: PayloadAction<boolean>) => {
                state.newAdded = action.payload;
            },
            changeEditId: (state, action: PayloadAction<number | null>) => {
                state.editId = action.payload
            },
            startGetData: (state) => {
                state.dataFetchingRequested = true;
            },
            successGetData: (state) => {
                state.dataFetchingRequested = false;
            },
            startDataEditing: (state, action: PayloadAction<Student>) => {
                state.dataEditingRequested = true;
            },
            startAddNew: (state, action: PayloadAction<Student>) => {
                state.dataAddRequested = true;
            },
            successAddNew: (state) => {
                state.dataAddRequested = false;
            },
            startRemove: (state, action: PayloadAction<number>) => {
                state.dataRemoveRequested = true;
            },
            RemoveData:(state, action: PayloadAction<number>) => {
               state.data=state.data.filter((item)=>{
                   if(item.id!==action.payload)return item
               })
            },
            successRemove: (state) => {
                state.dataRemoveRequested = false;
            },

        }
    }
);

export const {
    addNew,
    editData,
    changeSort,
    changeNewAdded,
    changeEditId,
    startGetData,
    startDataEditing,
    successGetData,
    successAddNew,
    startAddNew,
    startRemove,
    RemoveData,
    successRemove
} = studentSlice.actions;
export default studentSlice.reducer;