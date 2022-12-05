import * as React from 'react'

import { DatePicker,DatePickerChangeEvent } from '@progress/kendo-react-dateinputs'
import { GridCellProps } from '@progress/kendo-react-grid'

export const DatePickerCell = (props: GridCellProps) => {
    const max = new Date()
    const { dataItem } = props
    const field = props.field || ''
    const dataValue = dataItem[field] === null ? ' ' : dataItem[field]

    const handleChange = (e:DatePickerChangeEvent) => {
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
            ) : (
                dataValue.toDateString()
            )}
        </td>
    )
}
