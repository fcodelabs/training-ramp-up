import * as React from "react";
import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { GridCellProps } from "@progress/kendo-react-grid";

export const DropDownCell = (props: GridCellProps) => {
  const data = [
    { text: "Male", value: "Male" },
    { text: "Female", value: "Female" },
  ];

  const handleChange = (e: DropDownListChangeEvent) => {
    if (props.onChange) {
      props.onChange({
        dataIndex: 0,
        dataItem: props.dataItem,
        field: props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.target.value.value,
      });
    }
  };

  const { dataItem } = props;
  const field = props.field || "";
  const dataValue = dataItem[field] === null ? " " : dataItem[field];

  return (
    <td>
      {dataItem.inEdit ? (
        <DropDownList
          style={{ width: "100px" }}
          onChange={handleChange}
          value={data.find((c) => c.value === dataValue)}
          data={data}
          textField="text"
        />
      ) : (
        dataValue
      )}
    </td>
  );
};
