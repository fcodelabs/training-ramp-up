import { DatePicker } from '@progress/kendo-react-dateinputs';
import { GridCellProps } from '@progress/kendo-react-grid';
import { useEffect, useState } from 'react';

const DatePickerInput = (props: GridCellProps) => {
  const [value, setValue] = useState(new Date());
  const changeDate = ({ value }: any) => {
    setValue(value);
  };
  const { dataItem } = props;
  const field = props.field || '';
  const dataValue = dataItem[field];

  useEffect(() => {
    setValue(dataValue);
  }, []);

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

  const year = value.getFullYear();
  const month = value.getMonth();
  const date = value.getDate();
  const max = new Date();

  return (
    <td>
      {dataItem.inEdit ? (
        <DatePicker max={max} value={value} onChange={changeDate} />
      ) : (
        `${1 + month}/${date}/${year}`
      )}
    </td>
  );
};

export default DatePickerInput;
