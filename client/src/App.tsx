import React,{ useEffect, useState } from 'react';

//import socket.io for client integration
import { io } from 'socket.io-client';
//importing material theme
import '@progress/kendo-theme-material/dist/all.css';
// import kendo table components
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
//import action buttons cell
import MyCommandCell from './components/MyCommandCell';
//import custom date cell
import DateCell from './components/DateCell';
//importing actions
import { addStudent, getStudents, deleteStudent, updateStudent } from './services';

//import types
import { Student } from './interfaces';

//change mode for edit and add students
const editField = 'inEdit';

//initiate socket.io server
const socket = io('http://localhost:8000');

//validate inputs
const validateInputs= (dataItem:Student):boolean=>{
  if (
    dataItem.name === '' 
      || 
    dataItem.address === '' 
      || 
    dataItem.mobileNo === undefined 
      || 
    dataItem.gender === '' 
      || 
    dataItem.dob === '' 
      || 
    dataItem.mobileNo < 0 
      || 
    dataItem.mobileNo.toString().length !== 9
    ) {
    return false;
  }
  return true;
}

export default function App() {
  const [studentData, setStudentData] = useState<Student[]>([]);
  
  //get data on page load 
  useEffect(() => {
    getStudents()
      .then(({ data }) => setStudentData(data.students))
      .catch(()=>alert('Failed to retrieve data, please try refreshing the page or try again another time'));
  }, []);

  //refresh on data change
  useEffect(() => {
    socket.on('refetch_data', () => {
      getStudents()
        .then(({ data }) => setStudentData(data.students))
        .catch(()=>alert('Failed to retrieve data, please try refreshing the page or try again another time'));
    });
  }, [socket]);

  // add new student to state
  const addNewItem = () => {
    const newDataItem = {
      name: '',
      age: 0,
      gender: '',
      address: '',
      mobileNo: 0,
      dob: '',
      inEdit: true,
    };
    setStudentData([...studentData, newDataItem]);
  };

  // add new student do database
  const add = (dataItem: Student) => {
    const validity = validateInputs(dataItem);
    if(!validity){
      alert('Please fill in all the fields correctly to add a record !');
      return;
    } 
    dataItem.inEdit = true;
    addStudent(dataItem)
      .then(({ data }) => {
        const newStudent = { ...data.student };
        const oldStudents = studentData;
        oldStudents.pop();
        setStudentData([newStudent, ...oldStudents]);
        socket.emit('student_data_change');
      })
      .catch(()=>alert("Failed to add student, please check your details and try again Thank you!"));
  };

  //stop adding a new student
  const discard = () => {
    const newData = [...studentData];
    newData.pop();
    setStudentData(newData);
  };

  //initiate student for edit mode
  const enterEdit = (dataItem: Student) => {
    const isoDate = new Date(dataItem.dob);
    setStudentData(studentData.map((item) => (item.id === dataItem.id ? { ...item, dob: isoDate, inEdit: true } : item)));
  };

  //cancel editing student
  const cancel = (dataItem: Student) => {
    getStudents().then(({ data }) => {
      const originalStudent = data.students.find((item: Student) => item.id === dataItem.id);
      const newData = studentData.map((item) => (item.id === originalStudent.id ? originalStudent : item));
      setStudentData(newData);
    });
  };

  
  //push updates to database
  const update = (dataItem: Student) => {
    const validity = validateInputs(dataItem);
    if(!validity){
      alert('Please fill in all the fields correctly to add a record !');
      return;
    } 
    dataItem.inEdit = false;
    updateStudent(dataItem).then(() => {
      getStudents().then(({ data }) => {
        setStudentData(data.students);
        socket.emit('student_data_change');
      });
    }).catch(()=>alert("Failed to update student, check your details and try again Thank you !"));
  };

  //delete student from database
  const remove = (dataItem: Student) => {
    if(confirm("Are you sure you want to remove this student ?")){

      deleteStudent(dataItem.id).then(() => {
        getStudents().then(({ data }) => {
          setStudentData(data.students)
          socket.emit('student_data_change');
        });
      }).catch(()=>alert("Failed to delete the student, please try again!"));
    }
  };
  // //common
  const itemChange = (e: any) => {
    const newData = studentData.map((item) => (item.id === e.dataItem.id ? { ...item, [e.field]: e.value } : item));
    setStudentData(newData);
  };

  //custom cell for commands column
  const commandCell = (props: any) => (
    <MyCommandCell {...props} editField={editField} edit={enterEdit} add={add} discard={discard} cancel={cancel} update={update} remove={remove} />
  );

  return (
    <Grid data={studentData} editField={editField} onItemChange={itemChange}>
      <GridToolbar>
        <div>
          <button
            title="Add new"
            className="k-button k-button-md k-rounded-md "
            style={{ background: '#e2e8f0', color: '#000', border: 'none' }}
            onClick={addNewItem}
          >
            Add new
          </button>
        </div>
      </GridToolbar>
      <GridColumn field="id" title="ID" editable={false} />
      <GridColumn field="name" title="Name" editor="text" />
      <GridColumn field="gender" title="Gender" editor="text" />
      <GridColumn field="address" title="Address" editor="text" />
      <GridColumn field="mobileNo" title="Mobile-No" editor="numeric" />
      <GridColumn field="dob" title="Date of Birth" editor="date" format="{0:d}" cell={DateCell} />
      <GridColumn field="age" title="Age" editor="numeric" editable={false} />
      <GridColumn cell={commandCell} title="command" />
    </Grid>
  );
}
