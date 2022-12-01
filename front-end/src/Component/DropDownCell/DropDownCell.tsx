import * as React from 'react'
import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns'
import { GridCellProps } from '@progress/kendo-react-grid'

const DropDownCell = (prop: GridCellProps) => {
  const selectGender = [
    {
      text: 'Male',
      value: ' Male'
    },
    {
      text: 'Female',
      value: ' Female'
    }
  ]

  const handleChange = (e: DropDownListChangeEvent) => {
    if (prop.onChange != null) {
      prop.onChange({
        dataIndex: 0,
        dataItem: prop.dataItem,
        field: prop.field,
        syntheticEvent: e.syntheticEvent,
        value: e.target.value.value
      })
    }
  }

  const { dataItem } = prop
  const field = prop.field ?? ''
  const dataValue = dataItem[field] === null ? '' : dataItem[field]
  const inEdit: boolean = dataItem.inEdit

  return (
    <td>
      {inEdit
        ? (
        <DropDownList
          onChange={handleChange}
          value={selectGender.find((c) => c.value === dataValue.toString())}
          data={selectGender}
          textField="text"
        />
          )
        : (
            dataValue.toString()
          )}
    </td>
  )
}

export default DropDownCell
