import React from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import products from '../../products.json';
import Buttons from '../../components/Buttons/Buttons';
const dataGrid = () => {
  const btnStyle={
    'border':'2px solid black',
    'border-radius':'6px',
    'height':'2rem',
    'font-size':'16px',
    'font-weight':'bold'
  };
  return (
    <>
      <GridToolbar>
        <div>
          <button
            title="Add new"
            style={btnStyle}
            className="k-button k-primary"
          >
            Add new
          </button>
        </div>
      </GridToolbar>

      <Grid data={products}>
        <GridColumn field="ID" title="ID" />
        <GridColumn field="name" title="Name" />
        <GridColumn field="gender" title="Gender" />
        <GridColumn field="Address" title="Address" />
        <GridColumn field="Mobile No" title="Mobile No" />
        <GridColumn field="Date of birth" title="Date of birth" />
        <GridColumn field="Age" title="Age" />
        <GridColumn  title="Command" cell={Buttons} width="200px" />
      </Grid>
    </>
  );
};

export default dataGrid;
