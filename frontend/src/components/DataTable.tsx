import { useMutation, useQuery } from '@apollo/client';
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import {
  Grid,
  GridCellProps,
  GridColumn,
  GridItemChangeEvent,
  GridToolbar,
} from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  CREATE_STUDENT_QUERY,
  DELETE_STUDENT_QUERY,
  GET_ALL_STUDENTS_QUERY,
  UPDATE_STUDENT_QUERY,
} from '../graphql/Queries';
import { Student } from '../interfaces/interfaces';
import AgeInput from './AgeInput';
import CircularIndeterminate from './CircularIndeterminate';
import DatePickerInput from './DatePickerInput';
import DropDownCell from './DropDownCell';
import MobileInput from './MobileInput';
import MyCommandCell from './MyCommandCell';

const editField: string = 'inEdit';

interface IDataTableProps {
  setLoading: (loading: boolean) => void;
}

const DataTable = (props: IDataTableProps) => {
  const { setLoading } = props;
  const socket = io('http://localhost:8000/');
  const fileSaveSocket = io('http://localhost:8100/');
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const {
    loading,
    error,
    data: studentData,
    refetch,
  } = useQuery(GET_ALL_STUDENTS_QUERY);

  const [addStudent] = useMutation(CREATE_STUDENT_QUERY);
  const [deleteStudent] = useMutation(DELETE_STUDENT_QUERY);
  const [updateStudent] = useMutation(UPDATE_STUDENT_QUERY);

  useEffect(() => {
    if (!loading && studentData) {
      const fetchedStudents: Student[] = studentData?.getAllStudents.map(
        (obj: Student) => {
          let dateOfBirth = new Date(obj.dateOfBirth);
          return { ...obj, dateOfBirth };
        }
      );
      setData(fetchedStudents);
      setLoading(loading);
    }

    if (error) {
      console.log(error);
    }
  }, [error, loading, setLoading, studentData]);

  useEffect(() => {
    fileSaveSocket.on('file_save_message', (message) => {
      if (message) refetch();
    });
    socket.on('message_to_client', (message) => {
      if (message === 'student file uploaded!') {
        setOpen(true);
        setMessage('student file uploaded successfully!');
      }
    });
  }, [fileSaveSocket, refetch, socket]);

  const remove = async (dataItem: Student) => {
    await deleteStudent({ variables: { id: dataItem.id } });
    socket.emit('message_to_server', 'student removed!');
    refetch();
    setOpen(true);
    setMessage('student removed successfully!');
  };

  const add = async (dataItem: Student) => {
    dataItem.inEdit = false;
    dataItem.isArchive = false;
    console.log(dataItem.dateOfBirth);

    await addStudent({
      variables: {
        name: dataItem.name,
        gender: dataItem.gender,
        address: dataItem.address,
        dateOfBirth: dataItem.dateOfBirth,
        mobileNo: dataItem.mobileNo.toString(),
        age: dataItem.age,
        inEdit: dataItem.inEdit,
        isArchive: dataItem.isArchive,
      },
    });
    refetch();
    socket.emit('message_to_server', 'student created!');
    setOpen(true);
    setMessage('student created successfully!');
  };

  const update = async (dataItem: Student) => {
    dataItem.inEdit = false;
    await updateStudent({
      variables: {
        id: dataItem.id,
        name: dataItem.name,
        gender: dataItem.gender,
        address: dataItem.address,
        dateOfBirth: new Date(dataItem.dateOfBirth),
        mobileNo: dataItem.mobileNo.toString(),
        age: dataItem.age,
        inEdit: dataItem.inEdit,
        isArchive: false,
      },
    });

    refetch();
    socket.emit('message_to_server', 'student updated!');
    setOpen(true);
    setMessage('student updated successfully!');
  };

  // Local state operations
  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };

  const cancel = (dataItem: Student) => {
    const id = dataItem.id;
    dataItem.inEdit = false;
    const filteredArry = data.filter((obj: Student) => obj.id !== id);
    filteredArry.unshift(dataItem);
    setData(filteredArry);
  };

  const enterEdit = (dataItem: Student) => {
    setData(
      data.map((item) =>
        item.id === dataItem.id ? { ...item, inEdit: true } : item
      )
    );
  };

  const itemChange = (event: GridItemChangeEvent) => {
    const newData = data.map((item) =>
      item.id === event.dataItem.id
        ? { ...item, [event.field || '']: event.value }
        : item
    );

    setData(newData);
  };

  const addNew = () => {
    const newDataItem = { inEdit: true };
    setData([newDataItem, ...data]);
  };

  const CommandCell = (props: GridCellProps) => (
    <MyCommandCell
      {...props}
      edit={enterEdit}
      remove={remove}
      add={add}
      discard={discard}
      update={update}
      cancel={cancel}
      editField={editField}
    />
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <>
          <Grid data={data} onItemChange={itemChange} editField={editField}>
            <GridToolbar>
              <button
                title='Add new'
                className='k-button k-button-md k-rounded-md k-button-solID k-button-solID-primary'
                onClick={addNew}
              >
                Add new
              </button>
            </GridToolbar>
            <GridColumn field='name' title='Name' width='200px' />
            <GridColumn field='gender' title='Gender' cell={DropDownCell} />
            <GridColumn field='address' title='Address' width='200px' />
            <GridColumn field='mobileNo' title='MobileNo' cell={MobileInput} />
            <GridColumn
              field='dateOfBirth'
              title='Date Of Birth'
              cell={DatePickerInput}
              width='150px'
            />
            <GridColumn field='age' title='Age' cell={AgeInput} />
            <GridColumn cell={CommandCell} title='Commands' width='200px' />
          </Grid>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity='success'
              sx={{ width: '100%' }}
            >
              {message}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};
export default DataTable;
