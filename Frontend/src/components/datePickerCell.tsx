import * as React from "react";

import {
  DatePicker,
  DatePickerChangeEvent,
} from "@progress/kendo-react-dateinputs";
import { GridCellProps } from "@progress/kendo-react-grid";

export const DatePickerCell = (props: GridCellProps) => {
  const maxYear = new Date().getFullYear() - 18;
  const maxMonth = new Date().getMonth() + 1;
  const maxDay = new Date().getDate() - 1;
  const max = new Date(maxYear + "-" + maxMonth + "-" + maxDay);

  const { dataItem } = props;
  const field = props.field || "";
  const dataValue =
    dataItem[field] === undefined ? null : new Date(dataItem[field]);

  const handleChange = (e: DatePickerChangeEvent) => {
    if (props.onChange) {
      props.onChange({
        dataIndex: 0,
        dataItem: props.dataItem,
        field: props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.target.value,
      });
    }
  };
  return (
    <td>
      {dataItem.inEdit ? (
        <DatePicker
          max={max}
          onChange={handleChange}
          defaultValue={dataValue}
        />
      ) : dataValue != null ? (
        dataValue.toDateString()
      ) : (
        ""
      )}
    </td>
  );
};
