import React from 'react'
import {
  GridCellProps,Grid,
  GridColumn as Column,
  GridColumn,
  GridToolbar,
} from '@progress/kendo-react-grid'

const command = (props:GridCellProps) => {
  return (
    <td className='k-command-cell'>
      {props.dataItem.id === '' && (
        <>
          <button className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-light k-grid-save-command'>
            Add
          </button>
          <button className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-light k-grid-save-command'>
            Discard Changes
          </button>
        </>
      )}

      {props.dataItem.id !== '' && (
        <>
          <button className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-save-command'>
            Edit
          </button>
          <button className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-light k-grid-save-command'>
            Remove
          </button>
        </>
      )}
    </td>
  )
}

export default command