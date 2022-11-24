import * as React from 'react'
// import * as ReactDOM from 'react-dom'
import { Grid, GridColumn } from '@progress/kendo-react-grid'
import persons from './persons.json'
import { Button } from '@progress/kendo-react-buttons'
import '@progress/kendo-theme-default/dist/all.css'

const App: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '10px',
        minHeight: '100vh'
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <Button fillMode="outline">Add New</Button>
      </div>
      <Grid
        style={{ width: '100%', minHeight: '400px', maxHeight: '600px' }}
        data={persons}
      >
        <GridColumn field="PersonID" title="ID" width="80px" />
        <GridColumn field="PersonName" title="Name" width="200px" />
        <GridColumn field="Gender" title="Gender" width="150px" />
        <GridColumn field="Address" title="Address" width="200px" />
        <GridColumn field="MobileNo" title="Mobile No" width="200px" />
        <GridColumn field="DOB" title="Date Of Birth" width="220px" />
        <GridColumn field="Age" title="Age" width="110px" />
        <GridColumn
          title="command"
          width="183px"
          cell={() => (
            <td className="k-command-cell">
              <Button className="k-button-solid-primary">
                Edit
              </Button>
              <Button className="k-button-solid-base">
                Remove
              </Button>
            </td>
          )}
        />
      </Grid>
    </div>
  )
}

export default App
