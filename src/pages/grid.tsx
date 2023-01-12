import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';

import data from './data.json';

const CommandCell = () => {
  return(
    <td className="k-command-cell">
    <Button themeColor={'error'}>Edit</Button>
    <Button>Remove</Button>
    </td>
  )
}

export default function Grids () {
    return (
      <div>
      <Button>Add New</Button>
      <Grid
        style={{ height: '400px', marginTop: '20px' }}
        data={data}
        >
        <GridColumn field="ID" title="ID" width="40px" />
        <GridColumn field="Name" title="Name" width="250px" />
        <GridColumn field="Gender" title="Gender" />
        <GridColumn field="Address" title="Address" />
        <GridColumn field="Mobile No" title="Mobile No"/>
        <GridColumn field="Date of Birth" title="Date of Birth"/>
        <GridColumn field="Age" title="Age" />
        <GridColumn title= "command " cell = {CommandCell}  width="200px" />
      </Grid>
      </div>
    );
}

