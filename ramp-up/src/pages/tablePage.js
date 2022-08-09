import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Commands } from "./commandCell";
import {
  STUDENT_GET_QUERY,
  STUDENT_ADD_MUTATION,
  STUDENT_UPDATE_MUTATION,
  STUDENT_REMOVE_MUTATION,
} from "../gql/resolvers";
import { GridColumn, Grid, GridToolbar } from "@progress/kendo-react-grid";
import { useEffect } from "react";
import { io } from "socket.io-client";

const editField = "inEdit";
const ENDPOINT = "http://localhost:3077";

export const TablePage = () => {
  const socket = io(ENDPOINT);
  const [stdData, setStdData] = useState([]);

  //Queries and Mutations
  const { data, refetch } = useQuery(STUDENT_GET_QUERY);
  const [addingStudent, { loading: loads, error: newError }] =
    useMutation(STUDENT_ADD_MUTATION);
  const [
    updateStudent,
    { data: updatedData, loading: updateLoads, error: newupdateError },
  ] = useMutation(STUDENT_UPDATE_MUTATION);

  const [removeStudent] = useMutation(STUDENT_REMOVE_MUTATION);

  const [notification, setNotification] = useState([]);

  const notificationListner =  (recievingNotification) => {
     setNotification([...notification, recievingNotification]);
  };

  useEffect(() => {
    if (data) {
      const studentsArray = data.getAllStudents.filter(
        (student) => student.isArchive === false
      );
      setStdData(studentsArray);

      let stdNewData = studentsArray.map((student) => {
        let DOB = new Date(student.DOB);
        return { ...student, DOB };
      });

      setStdData(stdNewData);
      
    }
  }, [data]);

  useEffect(() => {
    socket.on("addStudent", notificationListner);
    socket.on("updateStudent", notificationListner);
    socket.on("removeStudent", notificationListner);
    console.log(notification);
    return () =>{
      socket.off("addStudent", notificationListner)
    }
  }, [notificationListner]);

  

  const commandCell = (props) => {
    return (
      <Commands
        {...props}
        edit={Edit}
        remove={Remove}
        add={Add}
        discard={Discard}
        update={update}
        cancel={cancel}
        editField={editField}
      />
    );
  };

  //CRUD OPERATIONS
  const Edit = (studentData) => {
    console.log(stdData);
    let newData = stdData.map((student) =>
      student.id === studentData.id
        ? {
            ...student,
            inEdit: true,
          }
        : student
    );
    setStdData(newData);
    
  };

  const Add = async (student) => {
    student.inEdit = true;
    console.log(student.DOB);
    if (loads) return console.log("Submitting...");
    if (newError) return console.log(`Submission error! ${newError.message}`);

    await addingStudent({
      variables: {
        name: student.name,
        gender: student.gender,
        address: student.address,
        mobileNo: student.mobileNo,
        DOB: new Date(student.DOB),
        age: student.age,
        isArchive: false,
      },
    });

    socket.emit("addStudent", "Student Added");

    refetch();
    
  };

  const Remove = async (student) => {
    socket.emit("removeStudent", " Student Removed");
    console.log(notification);
    console.log(student.id);
    await removeStudent({
      variables: { id: student.id },
    });

    refetch();
  };
  const update = async (student) => {
    let index = stdData.findIndex((record) => record.id === student.id);
    console.log(index);
    student = stdData[index];
    

    await updateStudent({
      variables: {
        id: student.id,
        Student_id: 23,
        name: student.name,
        gender: student.gender,
        address: student.address,
        mobileNo: student.mobileNo,
        DOB: new Date(student.DOB),
        age: student.age,
        isArchive: false,
      },
    });
    student.inEdit = false;
    socket.emit("updateStudent", "Student Updated");

    refetch();
  };

  const Discard = () => {
    const newData = [...stdData];
    newData.splice(0, 1);
    setStdData(newData);
  };
  const cancel = (student) => {
    const StudentoriginalData = data.getAllStudents.find(
      (S) => S.id === student.id
    );
    const newData = stdData.map((Student) =>
      Student.id === StudentoriginalData.id ? StudentoriginalData : Student
    );
    setStdData(newData);
    refetch();
  };

  const AddNewStudent = () => {
    const newStudentData = {
      inEdit: true,
    };
    setStdData([newStudentData, ...stdData]);
  };

  const itemChange = (event) => {
    const field = event.field || "";
    const newData = stdData.map((student) =>
      student.id === event.dataItem.id
        ? { ...student, [field]: event.value }
        : student
    );
    setStdData(newData);
  };
  return (
    <div>
      <Grid
        data={stdData}
        editField={editField}
        onItemChange={itemChange}
        dataItemKey={"Student_id"}
      >
        <GridToolbar>
          <button
            title="Add new"
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            onClick={AddNewStudent}
          >
            Add new
          </button>
        </GridToolbar>

        <GridColumn field="name" title="Name" />
        <GridColumn field="gender" title="Gender" />
        <GridColumn field="address" title="Address" />
        <GridColumn field="mobileNo" title="Mobile No" />
        <GridColumn
          field="DOB"
          title="Date of Birth"
          editor="date"
          format="{0:d}"
        />
        <GridColumn field="age" title="Age" editor="numeric" />
        <GridColumn cell={commandCell} title="Command" width={"240px"} />
      </Grid>
    </div>
  );
};
