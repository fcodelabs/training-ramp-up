import './dashboard.css';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import '@progress/kendo-theme-material/dist/all.css';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import MyCommandCell from '../MyCommandCell';
import DateCell from '../DateCell';
import { useNavigate } from "react-router-dom";
import { UserDataType,StudentDataType, Gender, Role } from '../../interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser, getStudents, createStudent, deleteStudent, updateStudent, checkUser } from '../../state/slices';
import type { RootState } from '../../state/store';

const editField = 'inEdit';

export default function Dashboard(){
  const user:UserDataType|null = useSelector((state: RootState)=>state.user);
  const students:StudentDataType[] = useSelector((state: RootState)=>state.student);
  const dispatch = useDispatch()
  const [studentData, setStudentData] = useState<StudentDataType[]>([]);
  const [userData,setUserData] = useState<UserDataType>({sessionId:'',name:'',email:'',role:Role.guest});
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user){
        navigate("/");
        return;
    }
    setUserData(user);
  },[user]);

  useEffect(()=>{
    if(students){
      setStudentData(students);
    }
  },[students]);

  useEffect(()=>{
    dispatch(checkUser());
    dispatch(getStudents());
  },[]);

  //socket io integration
  // useEffect(() => {
  //   const token = localStorage.getItem('access_token');
  //   if(token){
  //     socket.on('refetch_data', () => {
  //       getStudents(token)
  //       .then(({ data }) => {setStudentData(data.students);})
  //       .catch((error)=>{
  //         if(error.response.status===401){
  //           localStorage.removeItem('access_token');
  //           navigate("/");
  //           return;
  //         }
  //       });
  //     });
  //   }
  //   return ()=>{socket.off('refetch_data');}
  // }, [navigate]);

  //logOut user
  const handleLogOut = () => {
    dispatch(logOutUser({sessionId:userData.sessionId}));
  }

  const addNewItem = () => {
    const newDataItem: StudentDataType= {
      name:'',
      address:'',
      age:0,
      mobileNo:0,
      gender:Gender.Male,
      dob:new Date(0),
      inEdit: true,
    };
    setStudentData([...studentData, newDataItem]);
  };

  const add = (dataItem: StudentDataType) => {
    dispatch(createStudent({...dataItem}));
    };
    
  const discard = () => {
      const newData = [...studentData];
      newData.pop();
      setStudentData(newData);
  };

  const enterEdit = (dataItem: StudentDataType) => {
    setStudentData(studentData.map((item) => (item.id === dataItem.id ? { ...item, inEdit: true } : item)));
  };
  
  const cancel = (dataItem: StudentDataType) => {
      setStudentData(students);
  };

  
  const update = (dataItem: StudentDataType) => {

      dispatch(updateStudent({...dataItem}));
  };

  const remove = (dataItem: StudentDataType) => {
    dispatch(deleteStudent({id:dataItem.id}))
  };

  const itemChange = (e: any) => {
    const newData = studentData.map((item) => (item.id === e.dataItem.id ? { ...item, [e.field]: e.value } : item));
    setStudentData(newData);
  };


  const commandCell = (props: any) => (
    <MyCommandCell  {...props} editField={editField} role={userData.role} edit={enterEdit} add={add} discard={discard} cancel={cancel} update={update} remove={remove} />
  );

  return (
    <div className='dashboard'>
      <div className="content">
        <div className="user_header">
          <div className="user_title">
            <Typography variant="h4" style={{color:'#ef4444',fontWeight:'bold'}}>Welcome : {userData.name}</Typography>
            <Typography variant="subtitle2" style={{color:'#a9a9a9'}}>Email : {userData.email}</Typography>
            <Typography variant="subtitle2" style={{color:'#a9a9a9'}}>Role : {userData.role}</Typography>
          </div>
          <div>
            <Button onClick={handleLogOut} variant="contained" sx={{width:"fit"}}>Log Out</Button>
          </div>
        </div>
        <div className="data_grid">
          <Grid data={studentData} editField={editField} onItemChange={itemChange}>
            <GridToolbar>
              <div>
                <button
                  title="Add new"
                  className="k-button k-button-md k-rounded-md "
                  style={{ background: '#e2e8f0', color: '#000', border: 'none' }}
                  onClick={addNewItem}
                  disabled = {userData.role==="ADMIN"?false:true}
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
        </div>
      </div>
    </div>
  );
}