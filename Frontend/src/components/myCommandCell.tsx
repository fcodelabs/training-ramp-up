import * as React from 'react'
import { User } from './interface'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataItem: any
  editField: string
  add: (dataItem: User) => void
  update: (dataItem: User) => void
  discard: (dataItem: User) => void
  edit: (dataItem: User) => void
  remove: (dataItem: User) => void
  cancel: (dataItem: User) => void
}

export const MyCommandCell = (props: Props) => {
  const { dataItem } = props
  const inEdit = dataItem[props.editField]
  const isNewItem = dataItem.ID === undefined

  return inEdit ? (
    <td className='k-command-cell'>
      <button
        className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command'
        onClick={() => (isNewItem ? props.add(dataItem) : props.update(dataItem))}
      >
        {isNewItem ? 'Add' : 'Update'}
      </button>
      <button
        className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command'
        onClick={() => (isNewItem ? props.discard(dataItem) : props.cancel(dataItem))}
      >
        {isNewItem ? 'Discard' : 'Cancel'}
      </button>
    </td>
  ) : (
    <td className='k-command-cell'>
      <button
        className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command'
        onClick={() => props.edit(dataItem)}
      >
        Edit
      </button>
      <button
        className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command'
        onClick={() =>
          window.confirm('Confirm deleting: ' + dataItem.Name) && props.remove(dataItem)
        }
      >
        Remove
      </button>
    </td>
  )
}