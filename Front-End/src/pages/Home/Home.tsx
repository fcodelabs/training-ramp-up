// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// import * as React from "react";
// import { Form, Field, FieldRenderProps } from "@progress/kendo-react-form";
// import { Input } from "@progress/kendo-react-inputs";
// import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
// import { GridCellProps } from "@progress/kendo-react-grid";
// import "@progress/kendo-theme-default/dist/all.css";
// import { DropDownList } from "@progress/kendo-react-dropdowns";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   // deleteStudentAction,
//   // deleteStudentAction,
//   getStudentsAction,
//   selectStudent,
//   updateStudentAction,
// } from "./HomeSlice";

// const FORM_DATA_INDEX = "formDataIndex";
// const DATA_ITEM_KEY = "id";

// const requiredTextValidator = (value: string) =>
//   value ? "" : "The field is required";

// const requiredMobileValidator = (value: string) =>
//   isNaN(Number(value))
//     ? "Enter a valid mobile number"
//     : value.length === 10
//     ? ""
//     : "The Mobile Number should be 10 digits";

// const requiredDateValidator = (value: any) =>
//   value ? "" : "The field is required";

// const textInputWithValidation = (fieldRenderProps: FieldRenderProps) => {
//   const { validationMessage, visited, ...others } = fieldRenderProps;
//   return (
//     <div>
//       <Input {...others} />
//       {visited && validationMessage && (
//         <div role="alert" className="k-form-error k-text-start">
//           {validationMessage}
//         </div>
//       )}
//     </div>
//   );
// };

// const FormSubmitContext = React.createContext<
//   (event: React.SyntheticEvent<any, Event>) => void
// >(() => undefined);
// const GridEditContext = React.createContext<{
//   onRowAction: (options: {
//     rowIndex: number;
//     operation: "save" | "remove" | "add";
//     dataItem?: any;
//   }) => void;
//   setEditIndex: (rowIndex: number | undefined) => void;
//   editIndex: number | undefined;
// }>({} as any);

// const GridInlineFormRow = (props: { children: any; dataItem: any }) => {
//   const { onRowAction, editIndex } = React.useContext(GridEditContext);
//   const isInEdit = props.dataItem[FORM_DATA_INDEX] === editIndex;

//   const onSubmit = React.useCallback(
//     (e: any) => {
//       onRowAction({ rowIndex: editIndex!, operation: "save", dataItem: e });
//     },
//     [onRowAction, editIndex]
//   );

//   if (isInEdit) {
//     return (
//       <Form
//         key={JSON.stringify(props.dataItem)}
//         initialValues={props.dataItem}
//         onSubmit={onSubmit}
//         render={(formRenderProps) => {
//           return (
//             <FormSubmitContext.Provider value={formRenderProps.onSubmit}>
//               {props.children}
//             </FormSubmitContext.Provider>
//           );
//         }}
//       />
//     );
//   }

//   return props.children;
// };

// const textCell = (props: GridCellProps) => {
//   const { editIndex } = React.useContext(GridEditContext);
//   const isInEdit = props.dataItem[FORM_DATA_INDEX] === editIndex;

//   return (
//     <td>
//       {isInEdit ? (
//         <Field
//           component={textInputWithValidation}
//           name={`${props.field}`}
//           validator={requiredTextValidator}
//         />
//       ) : (
//         props.dataItem[props.field || ""]
//       )}
//     </td>
//   );
// };

// const dropDownCell = (props: GridCellProps) => {
//   const { editIndex } = React.useContext(GridEditContext);
//   const isInEdit = props.dataItem[FORM_DATA_INDEX] === editIndex;

//   return (
//     <td>
//       {isInEdit ? (
//         <Field
//           component={DropDownList}
//           name={`${props.field}`}
//           data={["Male", "Female"]}
//           validator={requiredTextValidator}
//         />
//       ) : (
//         props.dataItem[props.field || ""]
//       )}
//     </td>
//   );
// };

// const mobileCell = (props: GridCellProps) => {
//   const { editIndex } = React.useContext(GridEditContext);
//   const isInEdit = props.dataItem[FORM_DATA_INDEX] === editIndex;

//   return (
//     <td>
//       {isInEdit ? (
//         <Field
//           component={textInputWithValidation}
//           name={`${props.field}`}
//           validator={requiredMobileValidator}
//           placeholder="0771457890"
//         />
//       ) : (
//         props.dataItem[props.field || ""]
//       )}
//     </td>
//   );
// };

// const ageCell = (props: GridCellProps) => {
//   if (Number(props.dataItem.birthday.split("-")[0]) === 0) {
//     return <td></td>;
//   } else {
//     const age =
//       new Date().getFullYear() - Number(props.dataItem.birthday.split("-")[0]);
//     return <td>{age}</td>;
//   }
// };

// const dateCell = (props: GridCellProps) => {
//   const { editIndex } = React.useContext(GridEditContext);
//   const isInEdit = props.dataItem[FORM_DATA_INDEX] === editIndex;

//   return (
//     <td>
//       {isInEdit ? (
//         <Field
//           component={textInputWithValidation}
//           name={`${props.field}`}
//           validator={requiredDateValidator}
//           type="date"
//           max={new Date().toISOString().split("T")[0]}
//         />
//       ) : (
//         props.dataItem[props.field || ""]
//       )}
//     </td>
//   );
// };

// const commandCell = (props: GridCellProps) => {
//   const onSubmit = React.useContext(FormSubmitContext);
//   const { onRowAction, setEditIndex, editIndex } =
//     React.useContext(GridEditContext);

//   const rowIndex = props.dataItem[FORM_DATA_INDEX];
//   const isInEdit = rowIndex === editIndex;
//   const isNewItem = !props.dataItem[DATA_ITEM_KEY];

//   const onRemoveClick = React.useCallback(
//     (e: { preventDefault: () => void }) => {
//       e.preventDefault();
//       onRowAction({ rowIndex, operation: "remove" });
//     },
//     [rowIndex, onRowAction]
//   );

//   const onSaveClick = React.useCallback(
//     (e: React.SyntheticEvent<any, Event>) => {
//       e.preventDefault();
//       onSubmit(e);
//     },
//     [onSubmit]
//   );

//   const onEditClick = React.useCallback(
//     (e: { preventDefault: () => void }) => {
//       e.preventDefault();
//       setEditIndex(rowIndex);
//     },
//     [rowIndex, setEditIndex]
//   );

//   const onCancelClick = React.useCallback(
//     (e: { preventDefault: () => void }) => {
//       e.preventDefault();
//       setEditIndex(undefined);
//     },
//     [setEditIndex]
//   );

//   return isInEdit ? (
//     <td className="k-command-cell">
//       <button
//         className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
//         onClick={onSaveClick}
//       >
//         {isNewItem ? "Add" : "Update"}
//       </button>
//       <button
//         className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
//         onClick={isNewItem ? onRemoveClick : onCancelClick}
//       >
//         {isNewItem ? "Discard" : "Cancel"}
//       </button>
//     </td>
//   ) : (
//     <td className="k-command-cell">
//       <button
//         className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
//         onClick={onEditClick}
//       >
//         Edit
//       </button>
//       <button
//         className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
//         onClick={onRemoveClick}
//       >
//         Remove
//       </button>
//     </td>
//   );
// };

// const rowRender = (row: any, props: { dataItem: any }) => {
//   return <GridInlineFormRow dataItem={props.dataItem}>{row}</GridInlineFormRow>;
// };

// export default function Datagrid() {
//   const [dataState, setDataState] = React.useState([]);
//   const dispatch = useDispatch();
//   const students = useSelector(selectStudent);
//   console.log(students);

//   React.useEffect(() => {
//     dispatch(getStudentsAction());
//   }, []);

//   React.useEffect(() => {
//     setDataState(
//       students.data?.map((dataItem: any, idx: any) => ({
//         ...dataItem,
//         birthday: dataItem.birthday.split("T")[0],
//         [FORM_DATA_INDEX]: idx,
//       }))
//     );
//   }, [students.data]);

//   const [editIndex, setEditIndex] = React.useState<number | undefined>(
//     undefined
//   );

//   const onRowAction = React.useCallback(
//     (options: {
//       rowIndex: number;
//       operation: "save" | "remove" | "add";
//       dataItem?: any;
//     }) => {
//       const newDataState = [...dataState];
//       switch (options.operation) {
//         case "remove":
//           newDataState.splice(options.rowIndex, 1);
//           setDataState(newDataState);
//           // console.log(newDataState);
//           // api delete
//           // dispatch(deleteStudentAction(newDataState.id));
//           break;
//         case "save":
//           // eslint-disable-next-line no-case-declarations
//           const index = dataState.findIndex(
//             (student: { id: any }) => student.id === options.dataItem.id
//           );
//           newDataState[index] = options.dataItem;
//           // api update

//           dispatch(updateStudentAction(options.dataItem));
//           setEditIndex(undefined);
//           break;
//         case "add":
//           newDataState.unshift({
//             name: "",
//             [FORM_DATA_INDEX]: options.rowIndex,
//             [DATA_ITEM_KEY]:
//               Math.max(...dataState.map((s: { id: any }) => s.id)) + 1,
//             gender: "",
//             address: "",
//             mobile: "",
//             birthday: "",
//           });
//           setEditIndex(options.rowIndex);
//           break;
//         default:
//       }
//       setDataState(newDataState);
//     },
//     [dataState]
//   );

//   const onAddClick = React.useCallback(() => {
//     onRowAction({ rowIndex: dataState.length, operation: "add" });
//   }, [onRowAction, dataState]);

//   return (
//     <GridEditContext.Provider value={{ onRowAction, editIndex, setEditIndex }}>
//       <Grid data={dataState} dataItemKey={DATA_ITEM_KEY} rowRender={rowRender}>
//         <GridToolbar>
//           <button
//             title="Add new"
//             className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
//             onClick={onAddClick}
//           >
//             Add new
//           </button>
//         </GridToolbar>
//         <GridColumn title="Id" field="id" />
//         <GridColumn title="Name" field="name" cell={textCell} editor="text" />
//         <GridColumn
//           title="Gender"
//           field="gender"
//           cell={dropDownCell}
//           editor="text"
//         />
//         <GridColumn
//           title="Address"
//           field="address"
//           cell={textCell}
//           editor="text"
//         />
//         <GridColumn
//           title="Mobile No"
//           field="mobile"
//           cell={mobileCell}
//           editor="text"
//         />
//         <GridColumn title="Date of Birth" field="birthday" cell={dateCell} />
//         <GridColumn title="Age" cell={ageCell} />
//         <GridColumn title="Command" cell={commandCell} />
//       </Grid>
//     </GridEditContext.Provider>
//   );
// }
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  GridCellProps,
  GridColumn,
  GridItemChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";
import { CommandCell } from "../../components/CommandCell/CommandCell";
import { DropDownCell } from "../../components/DropDownCell/DropDownCell";
import { Student } from "../../utils/Interfaces/Student";
import { DatePickerCell } from "../../components/DatePickerCell/DatePickerCell";
import {
  addStudentAction,
  deleteStudentAction,
  getStudentsAction,
  selectStudent,
  setStudentsAction,
  updateStudentAction,
} from "./HomeSlice";
import { io } from "socket.io-client";
const socket = io("http://localhost:8000/", {
  transports: ["websocket"],
});

export default function Datagrid() {
  const editField = "inEdit";
  const students = useSelector(selectStudent);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getStudentsAction());
  }, []);

  React.useEffect(() => {
    console.log("useEffect");

    socket.on("connect", () => {
      console.log("Socket Id ", socket.id);
    });

    socket.on("student_added", (data) => {
      alert(data);
      dispatch(getStudentsAction());
    });

    socket.on("student_updated", (data) => {
      alert(data);
      dispatch(getStudentsAction());
    });

    socket.on("student_deleted", (data) => {
      alert(data);
      dispatch(getStudentsAction());
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      socket.off();
    };
  }, [students, socket]);

  const validations = new Map([
    ["name", new RegExp("^([A-z\\s.]{3,80})$")],
    ["address", new RegExp("^([A-z0-9/,\\s]{3,})$")],
    ["mobile", new RegExp("^([0][0-9]{9}|[0][0-9]{2}[-\\s][0-9]{7})$")],
    ["gender", new RegExp("^(MALE|FEMALE)$", "i")],
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateFields = (inputValue: any, field: string): boolean => {
    const key = validations.get(field);
    const valid = key ? key.test(inputValue) : true;
    if (inputValue && valid) {
      return true;
    } else {
      alert("Please enter valid " + field);
      return false;
    }
  };

  const validate = (item: Student): boolean => {
    return (
      validateFields(item.name, "name") &&
      validateFields(item.gender, "gender") &&
      validateFields(item.address, "address") &&
      validateFields(item.mobile, "mobile") &&
      validateFields(item.birthday, "birthday")
    );
  };

  const addNew = () => {
    const newDataItem: Student = {
      inEdit: true,
      birthday: undefined,
    };

    dispatch(setStudentsAction([newDataItem, ...students]));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const add = (dataItem: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const student: any = {
      name: dataItem.name,
      gender: dataItem.gender,
      address: dataItem.address,
      birthday: dataItem.birthday,
      age: dataItem.age,
      mobile: dataItem.mobile,
      inEdit: false,
    };
    if (validate(student)) {
      dispatch(addStudentAction(student));
    }
  };

  const discard = () => {
    const tempArray = [...students];
    tempArray.shift();
    dispatch(setStudentsAction(tempArray));
  };

  const edit = (dataItem: Student): void => {
    const tempArray = [...students];
    const temp = { ...dataItem };
    temp.inEdit = true;
    const index = tempArray.indexOf(dataItem);
    tempArray[index] = temp;
    dispatch(setStudentsAction(tempArray));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update = (dataItem: any) => {
    if (validate(dataItem)) {
      dispatch(updateStudentAction(dataItem));
    }
  };

  const cancel = (): void => {
    dispatch(getStudentsAction());
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const remove = (dataItem: any) => {
    const id = dataItem.id;
    dispatch(deleteStudentAction(id));
  };

  const itemChange = (e: GridItemChangeEvent) => {
    let age = e.dataItem.age;

    if (e.field === "birthday") {
      const today = new Date().getTime();
      const birthday = e.value.getTime();
      const tempAge = Math.floor((today - birthday) / (86400000 * 365));
      age = tempAge >= 18 ? tempAge : "";
    }

    const newData = students.map((student: { id: number }) =>
      student.id === e.dataItem.id
        ? { ...student, [e.field || ""]: e.value, age: age }
        : student
    );
    dispatch(setStudentsAction(newData));
  };

  //command cell

  const command = (props: GridCellProps) => (
    <CommandCell
      {...props}
      remove={remove}
      add={add}
      discard={discard}
      edit={edit}
      update={update}
      cancel={cancel}
    />
  );

  return (
    <Grid
      style={{ margin: "3vh" }}
      data={students}
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
      <GridColumn
        field="id"
        title="ID"
        width="50px"
        editable={false}
        className="k-grid-textbox"
      />
      <GridColumn field="name" title="Name" editor="text" />
      <GridColumn field="gender" title="Gender" cell={DropDownCell} />
      <GridColumn field="address" title="Address" editor="text" />
      <GridColumn field="mobile" title="Mobile No" editor="text" />
      <GridColumn
        field="birthday"
        title="Date of Birth"
        format="{0:D}"
        width="210px"
        cell={DatePickerCell}
      />
      <GridColumn field="age" title="Age" editable={false} />
      <GridColumn cell={command} title="Command" width="220px" />
    </Grid>
  );
}
