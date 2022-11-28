import React, { useEffect, useState } from 'react';
// import { Error } from '@progress/kendo-react-labels';
import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridItemChangeEvent,
  GridToolbar,
} from '@progress/kendo-react-grid';

import {
  insertItem,
  getItems,
  updateItem,
  deleteItem,
} from '../../Services/services';
import Command from '../../components/Buttons/Buttons';
import { Product } from '../../utils/interfaces';
import DropDownCell from '../../components/dropdown/DropDownCell';
const editField: string = 'inEdit';

const dataGrid = () => {
  const [user, setuser] = useState<Product[]>([]);
  useEffect(() => {
    const newUser = getItems();
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

  function checkvalidate(value: any, field: string | undefined) {
    const nameRegEx = /^[A-z ]{5,20}$/;
    const genderRegEx = /^[A-z ]{4,6}$/;
    const addressRegEx = /^[A-z ]{5,20}$/;
    const mobileRegEx = /^[0-9]{5,10}$/;

    switch (field) {
    case 'name':
      nameRegEx.test(value)
        ? console.log('success')
        : console.log('input error');
      break;
    case 'gender':
      genderRegEx.test(value)
        ? console.log('success')
        : console.log('input error');
      break;
    case 'Address':
      addressRegEx.test(value)
        ? console.log('success')
        : console.log('input error');
      break;
    case 'MobileNo':
      mobileRegEx.test(value)
        ? console.log('success')
        : console.log('input error');
      break;
    }
  }

  const itemChange = (event: GridItemChangeEvent) => {
    checkvalidate(event.value, event.field);
    const newData = user.map((item) =>
      item.ID === event.dataItem.ID
        ? { ...item, [event.field || '']: event.value }
        : item
    );

    setuser(newData);
  };

  // add new user
  const add = (dataItem: Product) => {
    dataItem.inEdit = true;
    if (
      dataItem.name === undefined ||
      dataItem.Address === undefined ||
      dataItem.gender === undefined ||
      dataItem.MobileNo === undefined ||
      dataItem.birth === undefined
    ) {
      alert('cannot assign null');
    } else {
      const newData: any = insertItem(dataItem);
      setuser(newData);
    }
  };

  // discard fields
  const discard = () => {
    const newData = [...user];
    newData.splice(0, 1);
    setuser(newData);
  };

  // update field
  const update = (dataItem: Product) => {
    dataItem.inEdit = false;
    const newData = updateItem(dataItem);
    setuser(newData);
  };

  // remove user
  const remove = (dataItem: Product) => {
    const newData = [...deleteItem(dataItem)];
    setuser(newData);
  };

  // cancel update
  const cancel = (dataItem: Product) => {
    const originalItem: any = getItems().find((p) => p.ID === dataItem.ID);
    const newData = user.map((item: any) =>
      item.ID === originalItem.ID ? originalItem : item
    );

    setuser(newData);
  };

  // enable edit
  const enterEdit = (dataItem: Product) => {
    setuser(
      user.map((item) =>
        item.ID === dataItem.ID ? { ...item, inEdit: true } : item
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

        <Column field="ID" title="ID" editable={false} />

        <Column id="p2" className="nameField" field="name" title="Name" />

        <Column field="gender" title="Gender" cell={DropDownCell} />

        <Column field="Address" title="Address" />

        <Column field="MobileNo" title="Mobile No" />

        <Column
          field="birth"
          title="Date of birth"
          format="{0:d}"
          editor="date"
        />
        <Column field="Age" title="Age" editable={false} />
        <Column title="Command" cell={Buttons} width="200px" />
      </Grid>
    </>
  );
};

export default dataGrid;
