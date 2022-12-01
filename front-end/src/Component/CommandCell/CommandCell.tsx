import * as React from 'react'
import '@progress/kendo-theme-default/dist/all.css'
import { CellProps } from '../../utils/interface'

const CommandCell: React.FC<CellProps> = (props: any) => {
  const { gridCellProps, edit, remove, add, discard, update, cancel } = props
  const inEdit: boolean = gridCellProps.dataItem.inEdit
  const isNewItem: boolean = gridCellProps.dataItem.personID === 0

  return inEdit
    ? (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
        onClick={() =>
          isNewItem
            ? add(gridCellProps.dataItem)
            : update(gridCellProps.dataItem)
        }
      >
        {isNewItem ? 'Add' : 'Update'}
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
        onClick={() =>
          isNewItem
            ? discard(gridCellProps.dataItem)
            : cancel(gridCellProps.dataItem)
        }
      >
        {isNewItem ? 'Discard' : 'Cancel'}
      </button>
    </td>
      )
    : (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
        onClick={() => edit(gridCellProps.dataItem)}
      >
        Edit
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
        onClick={() => {
          const confirmStatus: boolean = confirm(
            `Do you want to remove ${String(
              gridCellProps.dataItem.PersonName
            )}?`
          )
          if (!confirmStatus) return
          remove(gridCellProps.dataItem)
        }}
      >
        Remove
      </button>
    </td>
      )
}

export default CommandCell
