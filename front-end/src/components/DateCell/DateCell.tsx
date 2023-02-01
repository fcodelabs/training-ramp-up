import { DatePicker, DatePickerChangeEvent } from '@progress/kendo-react-dateinputs'
import { GridCellProps } from '@progress/kendo-react-grid'

export const DateCell = (props: GridCellProps) => {
  function subtractYears(date: Date, years: number): Date {
    date.setFullYear(date.getFullYear() - years)
    return date
  }
  const today = new Date()
  const max = subtractYears(today, 18)

  const { dataItem } = props
  const field = props.field || ''
  const dataValue = dataItem[field] === undefined ? null : new Date(dataItem[field])

  const handleChange = (e: DatePickerChangeEvent) => {
    if (props.onChange) {
      props.onChange({
        dataIndex: 0,
        dataItem: props.dataItem,
        field: props.field,
        syntheticEvent: e.syntheticEvent,
        value: e.target.value,
      })
    }
  }
  return (
    <td>
      {dataItem.inEdit ? (
        <DatePicker max={max} onChange={handleChange} defaultValue={dataValue} />
      ) : dataValue != null ? (
        dataValue.toDateString()
      ) : (
        ''
      )}
    </td>
  )
}
