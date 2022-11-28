/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from "react";
import { Form, Field, FieldRenderProps } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { GridCellProps } from "@progress/kendo-react-grid";
import { students } from "../../data/students";
import "@progress/kendo-theme-default/dist/all.css";
import { DropDownList } from "@progress/kendo-react-dropdowns";

const FORM_DATA_INDEX = "formDataIndex";
const DATA_ITEM_KEY = "id";

const requiredTextValidator = (value: string) =>
  value ? "" : "The field is required";

const requiredMobileValidator = (value: string) =>
  isNaN(Number(value))
    ? "Enter a valid mobile number"
    : value.length === 10
    ? ""
    : "The Mobile Number should be 10 digits";

const requiredDateValidator = (value: any) =>
  value ? "" : "The field is required";

const TextInputWithValidation = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && (
        <div role="alert" className="k-form-error k-text-start">
          {validationMessage}
        </div>
      )}
    </div>
  );
};

const FormSubmitContext = React.createContext<
  (event: React.SyntheticEvent<any, Event>) => void
>(() => undefined);
const GridEditContext = React.createContext<{
  onRowAction: (options: {
    rowIndex: number;
    operation: "save" | "remove" | "add";
    dataItem?: any;
  }) => void;
  setEditIndex: (rowIndex: number | undefined) => void;
  editIndex: number | undefined;
}>({} as any);

const GridInlineFormRow = (props: { children: any; dataItem: any }) => {
  const { onRowAction, editIndex } = React.useContext(GridEditContext);
  const isInEdit = props.dataItem[FORM_DATA_INDEX] === editIndex;

  const onSubmit = React.useCallback(
    (e: any) => {
      onRowAction({ rowIndex: editIndex!, operation: "save", dataItem: e });
    },
    [onRowAction, editIndex]
  );

  if (isInEdit) {
    return (
      <Form
        key={JSON.stringify(props.dataItem)}
        initialValues={props.dataItem}
        onSubmit={onSubmit}
        render={(formRenderProps) => {
          return (
            <FormSubmitContext.Provider value={formRenderProps.onSubmit}>
              {props.children}
            </FormSubmitContext.Provider>
          );
        }}
      />
    );
  }

  return props.children;
};

const TextCell = (props: GridCellProps) => {
  const { editIndex } = React.useContext(GridEditContext);
  const isInEdit = props.dataItem[FORM_DATA_INDEX] === editIndex;

  return (
    <td>
      {isInEdit ? (
        <Field
          component={TextInputWithValidation}
          name={`${props.field}`}
          validator={requiredTextValidator}
        />
      ) : (
        props.dataItem[props.field || ""]
      )}
    </td>
  );
};

const DropDownCell = (props: GridCellProps) => {
  const { editIndex } = React.useContext(GridEditContext);
  const isInEdit = props.dataItem[FORM_DATA_INDEX] === editIndex;

  return (
    <td>
      {isInEdit ? (
        <Field
          component={DropDownList}
          name={`${props.field}`}
          data={["male", "female"]}
          validator={requiredTextValidator}
        />
      ) : (
        props.dataItem[props.field || ""]
      )}
    </td>
  );
};

const MobileCell = (props: GridCellProps) => {
  const { editIndex } = React.useContext(GridEditContext);
  const isInEdit = props.dataItem[FORM_DATA_INDEX] === editIndex;

  return (
    <td>
      {isInEdit ? (
        <Field
          component={TextInputWithValidation}
          name={`${props.field}`}
          validator={requiredMobileValidator}
          placeholder="0771457890"
        />
      ) : (
        props.dataItem[props.field || ""]
      )}
    </td>
  );
};

const AgeCell = (props: GridCellProps) => {
  if (Number(props.dataItem.dateOfBirth.split("-")[0]) === 0) {
    return <td></td>;
  } else {
    const age =
      new Date().getFullYear() -
      Number(props.dataItem.dateOfBirth.split("-")[0]);
    return <td>{age}</td>;
  }
};

const DateCell = (props: GridCellProps) => {
  const { editIndex } = React.useContext(GridEditContext);
  const isInEdit = props.dataItem[FORM_DATA_INDEX] === editIndex;

  return (
    <td>
      {isInEdit ? (
        <Field
          component={TextInputWithValidation}
          name={`${props.field}`}
          validator={requiredDateValidator}
          type="date"
          max={new Date().toISOString().split("T")[0]}
        />
      ) : (
        props.dataItem[props.field || ""]
      )}
    </td>
  );
};

const CommandCell = (props: GridCellProps) => {
  const onSubmit = React.useContext(FormSubmitContext);
  const { onRowAction, setEditIndex, editIndex } =
    React.useContext(GridEditContext);

  const rowIndex = props.dataItem[FORM_DATA_INDEX];
  const isInEdit = rowIndex === editIndex;
  const isNewItem = !props.dataItem[DATA_ITEM_KEY];

  const onRemoveClick = React.useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      onRowAction({ rowIndex, operation: "remove" });
    },
    [rowIndex, onRowAction]
  );

  const onSaveClick = React.useCallback(
    (e: React.SyntheticEvent<any, Event>) => {
      e.preventDefault();
      onSubmit(e);
    },
    [onSubmit]
  );

  const onEditClick = React.useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      setEditIndex(rowIndex);
    },
    [rowIndex, setEditIndex]
  );

  const onCancelClick = React.useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      setEditIndex(undefined);
    },
    [setEditIndex]
  );

  return isInEdit ? (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
        onClick={onSaveClick}
      >
        {isNewItem ? "Add" : "Update"}
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
        onClick={isNewItem ? onRemoveClick : onCancelClick}
      >
        {isNewItem ? "Discard" : "Cancel"}
      </button>
    </td>
  ) : (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
        onClick={onEditClick}
      >
        Edit
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
        onClick={onRemoveClick}
      >
        Remove
      </button>
    </td>
  );
};

const rowRender = (row: any, props: { dataItem: any }) => {
  return <GridInlineFormRow dataItem={props.dataItem}>{row}</GridInlineFormRow>;
};

export default function Datagrid() {
  // Form data index is used as an alternative to ID for rows after data operations
  const [dataState, setDataState] = React.useState(
    students.map((dataItem, idx) => ({
      ...dataItem,
      [FORM_DATA_INDEX]: idx,
    }))
  );

  const [editIndex, setEditIndex] = React.useState<number | undefined>(
    undefined
  );

  const onRowAction = React.useCallback(
    (options: {
      rowIndex: number;
      operation: "save" | "remove" | "add";
      dataItem?: any;
    }) => {
      const newDataState = [...dataState];
      switch (options.operation) {
        case "remove":
          newDataState.splice(options.rowIndex, 1);
          setDataState(newDataState);
          break;
        case "save":
          // eslint-disable-next-line no-case-declarations
          const index = dataState.findIndex(
            (student) => student.id === options.dataItem.id
          );
          newDataState[index] = options.dataItem;
          setEditIndex(undefined);
          break;
        case "add":
          newDataState.push({
            name: "",
            [FORM_DATA_INDEX]: options.rowIndex,
            [DATA_ITEM_KEY]: Math.max(...dataState.map((s) => s.id)) + 1,
            gender: "",
            address: "",
            mobile: "",
            dateOfBirth: "",
          });
          setEditIndex(options.rowIndex);
          break;
        default:
      }
      setDataState(newDataState);
    },
    [dataState]
  );

  const onAddClick = React.useCallback(() => {
    onRowAction({ rowIndex: dataState.length, operation: "add" });
  }, [onRowAction, dataState]);

  return (
    <GridEditContext.Provider value={{ onRowAction, editIndex, setEditIndex }}>
      <Grid data={dataState} dataItemKey={DATA_ITEM_KEY} rowRender={rowRender}>
        <GridToolbar>
          <button
            title="Add new"
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            onClick={onAddClick}
          >
            Add new
          </button>
        </GridToolbar>
        <GridColumn title="Id" field="id" />
        <GridColumn title="Name" field="name" cell={TextCell} editor="text" />
        <GridColumn
          title="Gender"
          field="gender"
          cell={DropDownCell}
          editor="text"
        />
        <GridColumn
          title="Address"
          field="address"
          cell={TextCell}
          editor="text"
        />
        <GridColumn
          title="Mobile No"
          field="mobile"
          cell={MobileCell}
          editor="text"
        />
        <GridColumn title="Date of Birth" field="dateOfBirth" cell={DateCell} />
        <GridColumn title="Age" cell={AgeCell} />
        <GridColumn title="Command" cell={CommandCell} />
      </Grid>
    </GridEditContext.Provider>
  );
}
