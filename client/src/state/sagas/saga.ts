import { takeEvery } from "redux-saga/effects";
import { 
    logInUser, 
    logOutUser, 
    checkUser, 
    signUpUser, 
    createStudent, 
    updateStudent, 
    deleteStudent, 
    getStudents 
} from "../slices";
import { 
    handleGetUserStatus, 
    handleLogInUser, 
    handleLogOutUser, 
    handleSignUpUser, 
    handleGetStudents, 
    handleAddStudent, 
    handleDeleteStudent, 
    handleUpdateStudent 
} from './handlers'


export function* rootSaga(){
    
    yield takeEvery(checkUser.type,handleGetUserStatus);
    yield takeEvery(logOutUser.type,handleLogOutUser);
    yield takeEvery(logInUser.type,handleLogInUser);
    yield takeEvery(signUpUser.type,handleSignUpUser);

    yield takeEvery(getStudents.type,handleGetStudents);
    yield takeEvery(createStudent.type,handleAddStudent);
    yield takeEvery(updateStudent.type,handleUpdateStudent);
    yield takeEvery(deleteStudent.type,handleDeleteStudent);
}