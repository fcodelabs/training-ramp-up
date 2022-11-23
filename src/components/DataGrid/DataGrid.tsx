import * as React from "react";
import { Grid, GridColumn, GridToolbar,GridCellProps } from "@progress/kendo-react-grid";
import products from "./products.json";
import "@progress/kendo-theme-default/dist/all.css";
import { CommandCell } from "../CommandCell/CommandCell";
import { Product } from "./interfaces";



export default function DataGrid() {

    const [editField,setEditField]=React.useState("");
    const [data, setData] = React.useState<Array<Product>>(products);

    const addNew = () => {
        setEditField("inEdit");
        const newDataItem: Product = {
            inEdit: true,
            Discontinued: false,
            ID: 1,
            Name: "",
            Gender: "",
            Address: "",
            MobileNo: "",
            DateOfBirth: "",
            Age: 0
        };
    
        setData([newDataItem, ...data]);
    };

    const command = (props: GridCellProps) => (
        <CommandCell
            {...props}
            //edit={enterEdit}
            //remove={remove}
            //add={add}
            //discard={discard}
            //update={update}
            //cancel={cancel}
            editField={editField}
        />
    );

    return (
        <Grid 
            style={{ height: "650px", margin: "4vh" }} 
            data={data}
            editField={editField}
            dataItemKey={"ID"}
        >
            <GridToolbar>
                <button
                    title="Add new"
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                    onClick={addNew}
                >
                    Add new
                </button>
            </GridToolbar>
            <GridColumn field="ID" title="ID" width="40px" />
            <GridColumn field="Name" title="Name" width="250px" />
            <GridColumn field="Gender" title="Gender" />
            <GridColumn field="Address" title="Address" />
            <GridColumn field="MobileNo" title="Mobile No" />
            <GridColumn field="DateOfBirth" title="Date of Birth" />
            <GridColumn field="Age" title="Age" />
            <GridColumn cell={command} title="Command" width="200px" />
        </Grid>
    );
}
