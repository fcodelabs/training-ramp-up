import React, { useEffect, useState } from 'react';
import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridItemChangeEvent,
  GridToolbar,
} from '@progress/kendo-react-grid';

import {
  insertUser,
  getUser,
  updateUser,
  deleteUser,
} from '../../Services/services';
import Command from '../../components/Buttons/Buttons';
import { StudentModel } from '../../utils/interfaces';
import DropDownCell from '../../components/dropdown/DropDownCell';
import ValidatedDate from '../../components/validatedDate/validatedDate';
const editField: string = 'inEdit';

const dataGrid = () => {
  const [user, setuser] = useState<StudentModel[]>([]);

  useEffect(() => {
    const newUser = getUser();
    setuser(newUser);
  }, []);

  function addNewUserField() {
    const newUser = {
      inEdit: true,
      Discontinued: false,
    };
    console.log(newUser);
    setuser([newUser, ...user]);
  }

  const itemChange = (event: GridItemChangeEvent) => {
    const newData = user.map((item) =>
      item.id === event.dataItem.id
        ? { ...item, [event.field || '']: event.value }
        : item
    );
    setuser(newData);
  };

  // alidations
  function checkValidation(dataItem: StudentModel) {
    const nameRegEx = /^[A-z ]{5,20}$/;
    const addressRegEx = /^[A-z ]{5,20}$/;
    const mobileRegEx = /^[0-9]{5,10}$/;
    let fieldStatus: boolean = false;

    if (dataItem.name !== undefined && nameRegEx.test(dataItem.name)) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      alert('check name field....!');
      return;
    }

    if (dataItem.address !== undefined && addressRegEx.test(dataItem.address)) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      alert('check address field....!');
      return;
    }

    if (dataItem.gender !== undefined) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      alert('check gender field....!');
      return;
    }

    if (
      dataItem.mobileNo !== undefined &&
      mobileRegEx.test(dataItem.mobileNo)
    ) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      alert('check mobileNo field....!');
      return;
    }

    if (dataItem.birth !== undefined) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      alert('check birth field....!');
      return;
    }

    return fieldStatus;
  }

  // add new user
  const add = (dataItem: StudentModel) => {
    dataItem.inEdit = true;

    if (checkValidation(dataItem)) {
      const newData: any = insertUser(dataItem);
      setuser(newData);
    }

    // if (dataItem.name !== undefined && nameRegEx.test(dataItem.name)) {
    //   if (
    //     dataItem.address !== undefined &&
    //     addressRegEx.test(dataItem.address)
    //   ) {
    //     if (dataItem.gender !== undefined) {
    //       if (
    //         dataItem.mobileNo !== undefined &&
    //         mobileRegEx.test(dataItem.mobileNo)
    //       ) {
    //         if (dataItem.birth !== undefined) {
    //           const newData: any = insertUser(dataItem);
    //           setuser(newData);
    //         } else {
    //           alert('check date of birth....!');
    //         }
    //       } else {
    //         alert('check MobileNo....!');
    //       }
    //     } else {
    //       alert('check gender....!');
    //     }
    //   } else {
    //     alert('check address....!');
    //   }
    // } else {
    //   alert('check name....!');
    // }
  };

  // discard fields
  const discard = () => {
    const newData = [...user];
    newData.splice(0, 1);
    setuser(newData);
  };

  // update field
  const update = (dataItem: StudentModel) => {
    dataItem.inEdit = false;
    const newData = updateUser(dataItem);
    setuser(newData);
  };

  // remove user
  const remove = (dataItem: StudentModel) => {
    const newData = [...deleteUser(dataItem)];
    setuser(newData);
  };

  // cancel update
  const cancel = (dataItem: StudentModel) => {
    const originalItem: any = getUser().find((p) => p.id === dataItem.id);
    const newData = user.map((item: any) =>
      item.id === originalItem.id ? originalItem : item
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
