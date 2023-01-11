import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridItemChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";

import { MyCommandCell } from "../helpers/MyCommandCell";
import {
  insertItem,
  getItems,
  updateItem,
  deleteItem,
} from "../helpers/Services";
import { Product, Person } from "../helpers/interface";

const editField: string = "inEdit";

export const Table = () => {
  //const [data, setData] = React.useState<Product[]>([]);
  const [data, setData] = React.useState<Person[]>([]);
  React.useEffect(() => {
    let newItems = getItems();
    setData(newItems);
  }, []);

  const CommandCell = (props: GridCellProps) => (
    <MyCommandCell {...props} editField={editField} />
  );

  return (
    <Grid
      style={{ height: "520px" }}
      data={data}
      //  onItemChange={itemChange}
      editField={editField}
    >
      <GridToolbar>
        <button
          title="Add new"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-error"
        >
          Add new
        </button>
      </GridToolbar>
      <Column field="PersonID" title="Id" width="100px" editable={false} />
      <Column field="PersonName" title="Person Name" width="200px" />
      <Column field="PersonGender" title="Person Gender" width="150px" />
      <Column field="PersonAddress" title="Person Address"  />
      <Column field="PersonMobileNo" title="Person Mobile No" width="150px" />
      <Column
        field="DateOfBirth"
        title="Date Of Birth"
        editor="date"
        width="220px"
        format="{0:EEE MMM dd yyyy}"
      />

      <Column
        field="PersonAge"
        title="Person Age"
        editor="numeric"
        width="120px"
      />

      <Column title="Command" cell={CommandCell} width="300px" />
    </Grid>
  );
};
