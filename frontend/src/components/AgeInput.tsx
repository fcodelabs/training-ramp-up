import { GridCellProps } from '@progress/kendo-react-grid';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import * as React from 'react';

interface IAgeInputProps {}

const AgeInput = (props: GridCellProps) => {
  const { dataItem } = props;
  const field = props.field || '';
  const dataValue = dataItem[field] === null ? '' : dataItem[field];

  const handleOnChange = (e: any) => {
    if (props.onChange) {
      props.onChange({
        dataItem: props.dataItem,
        field: props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.value,
        dataIndex: 0,
      });
    }
  };

  return (
    <td>
      {dataItem.inEdit ? (
        <>
          <NumericTextBox
            required
            max={99}
            min={1}
            value={parseInt(dataValue)}
            format={''}
            onChange={handleOnChange}
            validationMessage={'should be 10 numbers'}
          />
        </>
      ) : (
        dataValue
      )}
    </td>
  );
};

export default AgeInput;
