import {GridCellProps} from "@progress/kendo-react-grid";
import {DropDown2} from "../pages/students/components/dropdown/DropDown2";
import {useAppDispatch, useAppSelector} from "../hooks";
import {
    addNew,
    changeEditId,
    changeNewAdded,
    changeSort,
    editData,
    startAddNew,
    startDataEditing, startRemove
} from "../pages/students/studentSlice";
import {Student,pageCallBack} from "./types";
import type {AppDispatch} from "../store";
import {isValidAddress, isValidDateOfBirth, isValidName, isValidTPNO} from "./studentValidations";
import {displayErrors} from "./toasts";
import {Page} from "@progress/kendo-react-dropdowns";


export const getStoreData = () => {
    const editId = useAppSelector(
        (state) => {
            return state.persistedReducer.studentData.editId;
        }
    );
    const data = useAppSelector(
        (state) => {
            return state.persistedReducer.studentData.data;
        }
    );

    const sort = useAppSelector(
        (state) => {
            return state.persistedReducer.studentData.sort;
        }
    );

    const newAdded = useAppSelector(
        (state) => {
            return state.persistedReducer.studentData.newAdded;
        }
    );

    const admin = useAppSelector(
        (state) => {
            return state.persistedReducer.userData.admin;
        }
    );

    const dispatch = useAppDispatch();
    return {data, editId, sort, newAdded,admin, dispatch}
}

export const calculateAge = (dob: Date) => {
    return Math.floor((Date.now() - dob.getTime()) / (1000 * 3600 * 24) / 365.25)
}



export const addRecord = (data: Student[], newAdded: boolean, dispatch: AppDispatch,setPage:pageCallBack) => {
    const recordCount = data.length;
    const page={
        skip:(data.length-9),
        take:data.length+1
    }
    if(recordCount>=10){
        setPage(page);
    }
    dispatch(
        changeSort(
            [{
                field: 'id',
                dir: 'desc',
            }]
        )
    )
    let maxId = 0
    data.forEach((item) => {
        if (item.id > maxId) {
            maxId = item.id
        }
    })
    if (!newAdded) {
        const newRecord = {
            id: maxId + 1,
            name: '',
            gender: '',
            address: '',
            mobileNo: '',
            dateOfBirth: null,
            age: 0,
        }
        // console.log(data);
        dispatch(changeNewAdded(true));
        dispatch(addNew(newRecord));
        dispatch(changeEditId(maxId + 1));
    }
}
export const validate = (data: Student | null) => {
    const errors: string[] = []
    if (data !== null && !isValidName(data.name).state) {
        errors.push(isValidName(data.name).error)
    }
    if (data !== null && !isValidAddress(data.address).state) {
        errors.push(isValidAddress(data.address).error)
    }
    if (data !== null && !isValidTPNO(data.mobileNo).state) {
        errors.push(isValidTPNO(data.mobileNo).error)
    }
    if (data !== null && !isValidDateOfBirth(data.dateOfBirth ? new Date(data.dateOfBirth) : null).state) {
        errors.push(isValidDateOfBirth(data.dateOfBirth ? new Date(data.dateOfBirth) : null).error)
    }
    return errors
}
export const execute = (
    editId: number,
    data: Student[],
    newAdded: boolean,
    dispatch: AppDispatch,
    setPage:pageCallBack
) => {
    const page={
        skip:0,
        take:10
    }

        setPage(page);

    let record: Student | null = null
    data.forEach((item) => {
        if (item.id === editId) {
            record = item
        }
    })
    const errors = validate(record)

    if (errors.length === 0) {

        if (record !== null) {
            if(!newAdded){
                dispatch(startDataEditing(record));
            }else{
                dispatch(startAddNew(record));
            }
        }
        dispatch(
            changeSort(
                [{
                    field: 'id',
                    dir: 'asc',
                }]
            )
        );

    } else {
        displayErrors(errors)
    }
}

export const cancel = (dispatch:AppDispatch)=>{
    dispatch(changeEditId(null));
    dispatch(changeNewAdded(false));
}

export const discard = (data: Student[], editId: number | null, dispatch: AppDispatch) => {
    // setEditId(null)
    if (editId !== null) {
        const newData: Student[] = [];
        data.forEach(
            (item) => {
                if (item.id !== editId) {
                    newData.push(item);
                }
            }
        )
        dispatch(editData(newData))
    }

    dispatch(changeEditId(null));
    dispatch(changeNewAdded(false));

}
export const edit = (newAdded: boolean, dispatch:AppDispatch, index: number) => {
    if (!newAdded) {
        dispatch(changeEditId(index));
    }
}
export const remove = (data: Student[], dataIndex: number, dispatch:AppDispatch) => {
    dispatch(startRemove(dataIndex));
}
