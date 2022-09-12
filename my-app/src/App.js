import React, { useEffect, useState } from "react";

//importing material theme
import "@progress/kendo-theme-material/dist/all.css"
// import kendo table components 
import {Grid,GridColumn,GridToolbar} from "@progress/kendo-react-grid";
//import action buttons cell 
import MyCommandCell from "./components/MyCommandCell";
//importing actions 
import { insertItem,getItems } from "./util/services";

const editField = "inEdit";

export default function App() {
  
  const [data,setData] = useState([]);

  useEffect(()=>{
    let newItems = getItems();
    setData(newItems)
  },[])

  const addNewItem =()=>{
    const newDataItem ={
      inEdit:true,
    }
    setData([newDataItem,...data])
  }

  const add = (dataItem)=>{
    dataItem.inEdit = true;
    console.log("item",dataItem);
    const newData = insertItem(dataItem);
    setData(newData);
  }

  const discard = () =>{
    const newData = [...data];
    newData.splice(0,1);
    setData(newData);
  }

  const itemChange = e=>{
    const newData = data.map(item => item.id === e.dataItem.id ? { ...item,
      [e.field || '']: e.value
    } : item);
    setData(newData);
  }

  const commandCell =(props)=> <MyCommandCell 
                                  {...props} 
                                  editField={editField}
                                  add={add}
                                  discard={discard}
                                />

  return (
    <Grid
      data={data}
      editField={editField}
      onItemChange = {itemChange}
    >
      <GridToolbar>
        <div >
          <button
            title="Add new"
            className="k-button k-button-md k-rounded-md "
            style={{background:"#e2e8f0",color:"#000"}}
            onClick={addNewItem}
          >
            Add new
          </button>
        </div>
      </GridToolbar>
      <GridColumn field="id" title="ID" editable={false}/>
      <GridColumn field="name" title="Name" editor="text"/>
      <GridColumn field="gender" title="Gender" editor="text"/>
      <GridColumn field="mobile-No" title="Mobile-No" editor="numeric"/>
      <GridColumn field="dob" title="Date of Birth" editor="date" format="{0:d}"/>
      <GridColumn field="age" title="Age" editor="numeric" editable={false}/>
      <GridColumn cell={commandCell} title="command" />
    </Grid>
  );
}
