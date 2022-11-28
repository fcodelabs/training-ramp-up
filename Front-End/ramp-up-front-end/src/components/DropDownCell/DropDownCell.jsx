import * as React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";

function DropDownCell(prop) {
  const selectGender = [
    {
      text: "Male",
      value: "Male",
    },
    {
      text: "Female",
      value: "Female",
    },
  ];

  const handleChange = (e) => {
    if (prop.onChange) {
      prop.onChange({
        dataIndex: 0,
        dataItem: prop.dataItem,
        field: prop.field,
        syntheticEvent: e.syntheticEvent,
        value: e.target.value.value,
      });
    }
  };

  const { dataItem } = prop;
  const field = prop.field || "";
  const dataValue = dataItem[field] === null ? "" : dataItem[field];
  return (
    <td>
      {dataItem.inEdit ? (
        <DropDownList
          style={{
            width: "100px",
          }}
          onChange={handleChange}
          value={selectGender.find((c) => c.value === dataValue)}
          data={selectGender}
          textField="text"
        />
      ) : (
        dataValue.toString()
      )}
    </td>
  );
}

export default DropDownCell;
