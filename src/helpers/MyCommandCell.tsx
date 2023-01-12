import * as React from 'react'
import { Person } from './interface'

export const MyCommandCell = (props: {
  editField: any
  add?: any
  update?: any
  discard?: any
  cancel?: any
  edit?: any
  remove?: any
  dataItem: Person
}): any => {
  const { dataItem } = props
  const inEdit = dataItem.inEdit
  const isNewItem = dataItem.PersonID === 0

  return inEdit ? (
    <td className='k-command-cell'>
      <button
        className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-save-command'
        onClick={() => {
          isNewItem ? props.add(dataItem) : props.update(dataItem)
        }}
      >
        {isNewItem ? 'Add' : 'Update'}
      </button>
      <button
        onClick={() => (isNewItem ? props.discard(dataItem) : props.cancel(dataItem))}
        className='k-button k-button-md k-rounded-md k-button-solid-base k-grid-cancel-command'
      >
        {isNewItem ? 'Discard' : 'Cancel'}
      </button>
    </td>
  ) : (
    <td className='k-command-cell'>
      <button
        onClick={() => props.edit(dataItem)}
        className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-success k-grid-edit-command'
      >
        Edit
      </button>
      <button
        onClick={() =>
          // eslint-disable-next-line no-restricted-globals
          confirm((dataItem.PersonName ) && 'Confirm deleting: ' + dataItem.PersonName) && props.remove(dataItem)
        }
        className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-error k-grid-remove-command'
      >
        Remove
      </button>
    </td>
  )
}
