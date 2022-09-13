import React, { useEffect, useState } from "react";

//importing material theme
import "@progress/kendo-theme-material/dist/all.css"
// import kendo table components 
import {Grid,GridColumn,GridToolbar} from "@progress/kendo-react-grid";
//import action buttons cell 
import MyCommandCell from "./components/MyCommandCell";
//importing actions 
import { insertItem,getItems,updateItem,deleteItem } from "./util/services";

const editField = "inEdit";

export default function App() {
  
  const [data,setData] = useState([]);

  useEffect(()=>{
    let newItems = getItems();
    setData(newItems)
  },[])

  useEffect(()=>{
    console.log("data has been changed",data)
  },[data])

  //add new record
  const addNewItem =()=>{
    const newDataItem ={
      inEdit:true,
    }
    setData([newDataItem,...data])
  }

  const add = (dataItem)=>{
    if(dataItem.name ==="" || dataItem.mobileNo=== undefined || dataItem.gender ==="" || dataItem.dob===""){
      alert("Please fill in all the fields to add a record !");
      return;
    }
    dataItem.inEdit = true;
    const newData = insertItem(dataItem);
    setData(newData);
  }

  const discard = () =>{
    const newData = [...data];
    newData.splice(0,1);
    setData(newData);
  }

  //edit/delete a record
  const enterEdit =(dataItem)=>{
    const isoDate = new Date(dataItem.dob)
    setData(data.map(item=>item.id === dataItem.id? {...item,dob:isoDate,inEdit:true}:item));
  }
  
  const cancel = dataItem=>{
    const originalItem =getItems().find(item=>item.id === dataItem.id);
    const newData = data.map(item=>item.id === originalItem.id?originalItem:item);
    setData(newData);
  }

  const update = dataItem =>{
    if(dataItem.name ==="" || dataItem.mobileNo.length < 11 || dataItem.gender ==="" || dataItem.dob===""){
      alert("Please fill in all the fields to add a record !");
      return;
    }
    dataItem.inEdit = false;
    const newData = updateItem(dataItem);
    setData(newData);
  }

  const remove = dataItem =>{
    const newData = deleteItem(dataItem,data);
    setData(newData);
  }

  //common
  const itemChange = e=>{
    const newData = data.map(item => item.id === e.dataItem.id ? { ...item,
      [e.field]: e.value
    } : item);
    setData(newData);
  }

  const commandCell =(props)=> <MyCommandCell 
                                  {...props} 
                                  editField={editField}
                                  edit={enterEdit}
                                  add={add}
                                  discard={discard}
                                  cancel={cancel}
                                  update={update}
                                  remove={remove}

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
      <GridColumn field="mobileNo" title="Mobile-No" editor="numeric"/>
      <GridColumn field="dob" title="Date of Birth" editor="date" format="{0:d}"/>
      <GridColumn field="age" title="Age" editor="numeric" editable={false}/>
      <GridColumn cell={commandCell} title="command" />
    </Grid>
  );
}
