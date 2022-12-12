import * as React from 'react'
import { Person } from '../../utils/interfaces'

export const CommandCell = (props: {
    add: (param: Person) => void
    update: (param: Person) => void
    discard: () => void
    cancel: (param: Person) => void
    edit: (param: Person) => void
    remove: (param: Person) => void
    dataItem: Person
}) => {
    const { dataItem } = props
    const inEdit = dataItem.inEdit
    const isNewItem = dataItem.id == undefined

    return inEdit ? (
        <td className="k-command-cell">
            <button
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
                onClick={() =>
                    isNewItem ? props.add(dataItem) : props.update(dataItem)
                }
            >
                {isNewItem ? 'Add' : 'Update'}
            </button>
            <button
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
                onClick={() =>
                    isNewItem ? props.discard() : props.cancel(dataItem)
                }
            >
                {isNewItem ? 'Discard Changes' : 'Cancel'}
            </button>
        </td>
    ) : (
        <td className="k-command-cell">
            <button
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
                onClick={() => props.edit(dataItem)}
            >
                Edit
            </button>
            <button
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
                onClick={() =>
                    confirm('Confirm Deleting : ' + dataItem.name) &&
                    props.remove(dataItem)
                }
            >
                Remove
            </button>
        </td>
    )
}
