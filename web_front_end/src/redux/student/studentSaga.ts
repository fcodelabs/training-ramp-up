import { all, call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
    addedStudentDataApi,
    deleteStudentDataApi,
    getStudentDataApi,
    updateStudentDataApi,
} from "../../api/api";
import { tableDataActions } from "./studentSlice";

// Define data types
interface ITableData {
    studentId: number;
    studentName: string;
    studentAddress: string;
    studentMobile: string;
    studentDob: string;
    studentGender: string;
}

// Define response types
interface IResponseData {
    data: {
        data: ITableData[];
    };
}

// Define action types
const { fetchTableData, removeTableData, updateTableData, setTableData } =
    tableDataActions;

// Define saga functions
function* getAllTableDataRows() {
    try {
        const response: IResponseData = yield call(getStudentDataApi);
        console.log(response.data.data);
        yield put(setTableData(response.data.data));
    } catch (e) {
        console.log("Loading data failed. Please try again." + e);
    }
}

function* updateTableDataRow(action: PayloadAction<ITableData>) {
    const data = action.payload;
    const isUpdate: boolean = data.studentId !== -1;

    const tableData = {
        studentId: data.studentId,
        studentName: data.studentName,
        studentAddress: data.studentAddress,
        studentMobile: data.studentMobile,
        studentDob: data.studentDob,
        studentGender: data.studentGender,
    };

    try {
        if (isUpdate) {
            yield call(updateStudentDataApi, data.studentId, tableData);
        } else {
            yield call(addedStudentDataApi, tableData);
        }

        yield call(getAllTableDataRows);
    } catch (e) {
        console.log("Saving or Updating data failed. Please try again." + e);
    }
}

function* deleteTableDataRow(action: PayloadAction<number>) {
    const id = action.payload;
    try {
        yield call(deleteStudentDataApi, id);
        yield call(getAllTableDataRows);
    } catch (e) {
        console.log("Deleting data failed. Please try again." + e + id);
    }
}

function* tableDataSaga() {
    yield takeEvery(fetchTableData, getAllTableDataRows);
    yield takeEvery(updateTableData, updateTableDataRow);
    yield takeEvery(removeTableData, deleteTableDataRow);
}

function* studentSaga() {
    yield all([tableDataSaga()]);
}

export default studentSaga;
