import * as React from "react";
//import * as ReactDOM from "react-dom";
import {
    Grid,
    GridCellProps,
    GridColumn,
    GridItemChangeEvent,
    GridToolbar,
} from "@progress/kendo-react-grid";
import { sampleData } from "./sampleData";
import "@progress/kendo-theme-default/dist/all.css";
import { CommandCell } from "../../components/CommandCell/CommandCell";
import { Person } from "./interfaces";

export default function HomePage() {
    const editField = "inEdit";
    const dataSet=[...sampleData];
    const [data, setData] = React.useState<Person[]>(dataSet);


    const generateId = () =>data.reduce((acc, current:Person) => Math.max(acc, current.ID), 0) + 1;

    const discard = () => {
        data.shift();
        setData([...data]);
    };

    // const cancel = (dataItem:any) => {
    //     const temp=dataSet.find((item)=>{return item.ID===dataItem.ID;});
    //     dataItem=temp;
    //     dataItem.inEdit = false;
    //     setData(dataSet);
    // };
     
    const add = (dataItem: any) => {
        const item=dataItem;
        item.ID=generateId();
        item.inEdit = false;
        const today=new Date().getTime();        
        const birthday=item.DateOfBirth.getTime();
        const age =Math.floor((today-birthday)/(86400000*365));
        item.Age=age;
        dataSet.unshift(item);
        setData(dataSet);
    };

    // const edit = (dataItem: any) => {
    //     const item=dataItem;
    //     item.inEdit = true;
    //     item.editField="";
    //     setData([...data]);
    // };

    // const update = (dataItem:any) => {
    //     const temp=dataSet.find((item)=>{return item.ID===dataItem.ID;});
    //     if(temp){
    //         const index=dataSet.indexOf(temp);  
    //         dataItem.inEdit=false;
    //         dataSet[index]=dataItem; 
    //         setData(dataSet);            
    //     }
        
    // };

    const addNew = () => {
        const newDataItem: Person = {
            inEdit: true,
            ID:0
        };
        setData([newDataItem, ...data]);      
        
    };

    const itemChange = (event: GridItemChangeEvent) => {
        const newData = data.map((item) =>
            item.ID === event.dataItem.ID
                ? { ...item, [event.field || ""]: event.value }
                : item
        );
    
        setData(newData);
    };

    const command = (props: GridCellProps) => (
        <CommandCell
            {...props}
           
            //remove={remove}
            add={add}
            discard={discard}
            //edit={edit}
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
            onItemChange={itemChange}
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
            <GridColumn field="ID" title="ID" width="40px" editable={false} />
            <GridColumn
                field="Name"
                title="Name"
                width="250px"
                editor="text"
            />
            <GridColumn field="Gender" title="Gender"  editor="text"/>
            <GridColumn field="Address" title="Address"  editor="text"/>
            <GridColumn field="MobileNo" title="Mobile No"  editor="text" />
            <GridColumn field="DateOfBirth" title="Date of Birth"  editor="date" format="{0:D}" width="210px"/>
            <GridColumn field="Age" title="Age" editable={false}/>
            <GridColumn cell={command} title="Command" width="220px" />
        </Grid>
    );
}

