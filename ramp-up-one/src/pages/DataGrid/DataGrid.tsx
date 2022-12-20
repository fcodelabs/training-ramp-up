import React, { useEffect, useState } from 'react';
import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridItemChangeEvent,
  GridToolbar,
} from '@progress/kendo-react-grid';

import Command from '../../components/Buttons/Buttons';
import { StudentModel } from '../../utils/interfaces';
import DropDownCell from '../../components/Dropdown/DropDownCell';
import ValidatedDate from '../../components/ValidatedDate/ValidatedDate';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStudentAction,
  addStudent,
  updateStudentAction,
  deleteStudentAction,
} from './studentSlice';
import { checkValidation } from '../../utils/validation';

const editField: string = 'inEdit';

const dataGrid = () => {
  const [user, setuser] = useState<StudentModel[]>([]);
  const selectStudent = useSelector((state: any) => state.studentSlice.student);
  const dispatch = useDispatch();
  const [updateField, setupdateField] = React.useState<
    Array<{
      id: number;
      value: Map<string, any>;
    }>
  >([]);

  useEffect(() => {
    dispatch(getStudentAction());
  }, []);

  useEffect(() => {
    setuser(selectStudent);
  }, [selectStudent]);

  function addNewUserField() {
    const newUser = {
      inEdit: true,
      Discontinued: false,
    };
    setuser([newUser, ...user]);
  }
  function getAge(dob: Date) {
    const diffms = Date.now() - dob.getTime();
    const agedt = new Date(diffms);
    return Math.abs(agedt.getUTCFullYear() - 1970);
  }
  const itemChange = (event: GridItemChangeEvent) => {
    // set age
    let age = event.dataItem.age;
    if (event.field === 'birth') {
      const tempAge = getAge(event.value);
      if (tempAge > 18) {
        age = tempAge;
      } else {
        age = 0;
        alert('age needs to be more than 18 years....!');
      }
    }

    // set editable field
    const newData = user.map((item) =>
      item.id === event.dataItem.id
        ? { ...item, [event.field || '']: event.value, age }
        : item
    );

    // set updated field
    if (event.field) {
      const dataOb = updateField.filter(
        (Item) => Item.id === event.dataItem.id
      )[0];

      if (dataOb !== undefined) {
        dataOb.value.set(event.field, event.value);
      } else {
        const map = new Map<string, any>();
        map.set(event.field, event.value);
        const newOb = {
          id: event.dataItem.id,
          value: map,
        };
        updateField.unshift(newOb);
      }
      setupdateField([...updateField]);
    }

    setuser(newData);
  };

  // add new user
  const add = (dataItem: StudentModel) => {
    if (checkValidation(dataItem)) {
      dataItem.inEdit = true;
      dispatch(addStudent(dataItem));
    }
  };

  // update field
  const update = (dataItem: StudentModel) => {
    const field = updateField.filter((Item) => Item.id === dataItem.id)[0];

    if (field !== undefined) {
      const data: any = { id: field.id };
      field.value.forEach((value, key) => {
        data[key] = value;
      });

      if (checkValidation(dataItem)) {
        dataItem.inEdit = false;
        dispatch(updateStudentAction(data));
        const index = updateField.indexOf(field);
        updateField.splice(index, 1);
      }
    } else {
      alert('no field');
    }
  };

  // remove user
  const remove = (dataItem: StudentModel) => {
    dispatch(deleteStudentAction(dataItem.id));
  };

  // discard fields
  const discard = () => {
    const newData = [...user];
    newData.splice(0, 1);
    setuser(newData);
  };

  // cancel update
  const cancel = (dataItem: StudentModel) => {
    const originalStudent: any = selectStudent.find(
      (item: any) => item.id === dataItem.id
    );
    const newData = user.map((item: any) =>
      item.id === originalStudent.id ? originalStudent : item
    );
    setuser(newData);
  };

  // enable edit
  const enterEdit = (dataItem: StudentModel) => {
    setuser(
      user.map((item) =>
        item.id === dataItem.id ? { ...item, inEdit: true } : item
      )
    );
  };

  // props
  const Buttons = (props: GridCellProps) => (
    <Command
      {...props}
      add={add}
      editField={editField}
      discard={discard}
      update={update}
      cancel={cancel}
      edit={enterEdit}
      remove={remove}
    />
  );

  // add btn styles
  const btnStyle = {
    border: '2px solid black',
    borderRadius: '6px',
    height: '2rem',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  return (
    <>
      <Grid data={user} editField={editField} onItemChange={itemChange}>
        <GridToolbar>
          <div>
            <button
              title="Add new"
              style={btnStyle}
              className="k-button k-primary"
              onClick={addNewUserField}
            >
              Add new
            </button>
          </div>
        </GridToolbar>

        <Column field="id" title="ID" editable={false} />

        <Column id="p2" className="nameField" field="name" title="Name" />

        <Column field="gender" title="Gender" cell={DropDownCell} />

        <Column field="address" title="Address" />

        <Column field="mobileNo" title="Mobile No" />

        <Column
          field="birth"
          title="Date of birth"
          // format="{0:d}"
          cell={ValidatedDate}
          // editor="date"
        />
        <Column field="age" title="Age" editable={false} />
        <Column title="Command" cell={Buttons} width="200px" />
      </Grid>
    </>
  );
};

export default dataGrid;
