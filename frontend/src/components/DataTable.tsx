import { useMutation, useQuery } from '@apollo/client';
import {
  Grid,
  GridCellProps,
  GridColumn,
  GridItemChangeEvent,
  GridToolbar,
} from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import {
  CREATE_STUDENT_QUERY,
  DELETE_STUDENT_QUERY,
  GET_ALL_STUDENTS_QUERY,
  UPDATE_STUDENT_QUERY,
} from '../graphql/Queries';
import { Student } from '../interfaces/interfaces';
import CircularIndeterminate from './CircularIndeterminate';
import MyCommandCell from './MyCommandCell';
const editField: string = 'inEdit';

interface IDataTableProps {
  setLoading: (loading: boolean) => void;
}

const DataTable = (props: IDataTableProps) => {
  const [socket, setSoket] = useState<Socket>();
  const { setLoading } = props;
  const [data, setData] = useState<any[]>([]);
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
    const newSocket = io('http://localhost:8000/');
    setSoket(newSocket);
  }, []);

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
  }, [error, loading, studentData]);

  useEffect(() => {
    socket?.on('message_to_client', (message) => {
      console.log(message);
    });

    return () => {
      socket?.off('message_to_client', (message) => {
        console.log(message);
      });
    };
  }, [socket]);

  const remove = async (dataItem: Student) => {
    deleteStudent({ variables: { id: dataItem.id } });
    socket?.emit('message_to_server', 'student removed!');
    refetch();
  };

  const add = (dataItem: Student) => {
    dataItem.inEdit = false;
    dataItem.isArchive = false;

    addStudent({
      variables: {
        name: dataItem.name,
        gender: dataItem.gender,
        address: dataItem.address,
        dateOfBirth: new Date(dataItem.dateOfBirth),
        mobileNo: dataItem.mobileNo,
        age: dataItem.age,
        inEdit: dataItem.inEdit,
        isArchive: dataItem.isArchive,
      },
    });
    refetch();
    socket?.emit('message_to_server', 'student created!');
  };

  const update = async (dataItem: Student) => {
    dataItem.inEdit = false;
    updateStudent({
      variables: {
        id: dataItem.id,
        name: dataItem.name,
        gender: dataItem.gender,
        address: dataItem.address,
        dateOfBirth: dataItem.dateOfBirth,
        mobileNo: dataItem.mobileNo,
        age: dataItem.age,
        inEdit: dataItem.inEdit,
        isArchive: false,
      },
    });

    refetch();
    socket?.emit('message_to_server', 'student updated!');
  };

  // Local state operations
  const discard = async () => {
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

  return (
    <>
      {loading ? (
        <CircularIndeterminate />
      ) : (
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
          <GridColumn field='gender' title='Gender' />
          <GridColumn field='address' title='Address' width='200px' />
          <GridColumn field='mobileNo' title='MobileNo' />
          <GridColumn
            field='dateOfBirth'
            title='Date Of Birth'
            editor='date'
            format='{0:d}'
            width='150px'
          />
          <GridColumn field='age' title='Age' editor='numeric' />
          {/* <GridColumn field='Discontinued' title='Discontinued' editor='boolean' /> */}
          <GridColumn cell={CommandCell} title='Commands' width='200px' />
        </Grid>
      )}
    </>
  );
};
export default DataTable;
