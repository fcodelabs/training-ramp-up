import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { DatePicker } from '@progress/kendo-react-dateinputs';
const ValidatedDate = (prop) => {
  const min = new Date(1900, 2, 10);
  const max = new Date();


  const { dataItem } = prop;
  const field = prop.field || '';
  const dataValue = dataItem[field] === null ? '' : dataItem[field];
  const handleChange = (e) => {
    console.log(e.target.value);
    if (prop.onChange) {
      prop.onChange({
        dataIndex: 0,
        dataItem: prop.dataItem,
        field: prop.field,
        syntheticEvent: e.syntheticEvent,
        value: e.target.value,
      });
    }
  };
  return (
    <td>
      {dataItem.inEdit ? (
        <DatePicker
          min={min}
          max={max}
          onChange={handleChange}
          onkeydown="return false;"
          // value={selectGender.find((c) => c.value === dataValue)}
        />
      ) : (
        dataValue.toString()
      )}
    </td>
  );
};
export default ValidatedDate;
