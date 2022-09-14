import React,{ useEffect, useState } from 'react';
import { io } from 'socket.io-client';
//importing material theme
import '@progress/kendo-theme-material/dist/all.css';
// import kendo table components
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
//import action buttons cell
import MyCommandCell from './components/MyCommandCell';
import DateCell from './components/DateCell';
//importing actions
import { addStudent, getStudents, deleteStudent, updateStudent } from './services';

//import types
import { Student } from './interfaces';

const socket = io('http://localhost:8000');
const editField = 'inEdit';

export default function App() {
  const [studentData, setStudentData] = useState<Student[]>([]);

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

  // add new record
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

  const add = (dataItem: Student) => {
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
        dataItem.mobileNo<0 
          || 
        dataItem.mobileNo > 999999999
        ) {
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

  const discard = () => {
    const newData = [...studentData];
    newData.pop();
    setStudentData(newData);
  };

  //edit/delete a record
  const enterEdit = (dataItem: Student) => {
    const isoDate = new Date(dataItem.dob);
    setStudentData(studentData.map((item) => (item.id === dataItem.id ? { ...item, dob: isoDate, inEdit: true } : item)));
  };

  const cancel = (dataItem: Student) => {
    getStudents().then(({ data }) => {
      const originalStudent = data.students.find((item: Student) => item.id === dataItem.id);
      const newData = studentData.map((item) => (item.id === originalStudent.id ? originalStudent : item));
      setStudentData(newData);
    });
  };

  const update = (dataItem: Student) => {
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
      dataItem.mobileNo<0 
        || 
      dataItem.mobileNo > 999999999
      ) {
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

  const remove = (dataItem: Student) => {
    deleteStudent(dataItem.id).then(() => {
      getStudents().then(({ data }) => {
        setStudentData(data.students)
        socket.emit('student_data_change');
      });
    }).catch(()=>alert("Failed to delete the student, please try again!"));
  };
  // //common
  const itemChange = (e: any) => {
    const newData = studentData.map((item) => (item.id === e.dataItem.id ? { ...item, [e.field]: e.value } : item));
    setStudentData(newData);
  };

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
