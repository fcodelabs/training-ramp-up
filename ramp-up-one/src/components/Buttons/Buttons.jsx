import * as React from 'react';

const Buttons = (props) => {
  const { dataItem, userRoll } = props;
  const inEdit = dataItem[props.editField];
  const isNewItem = dataItem.id === undefined;

  return inEdit ? (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
        onClick={() =>
          isNewItem ? props.add(dataItem) : props.update(dataItem)
        }
        disabled={userRoll !== 'Admin'}
      >
        {isNewItem ? 'Add' : 'Update'}
      </button>

      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
        onClick={() =>
          isNewItem ? props.discard(dataItem) : props.cancel(dataItem)
        }
        disabled={userRoll !== 'Admin'}
      >
        {isNewItem ? 'Discard' : 'Cancel'}
      </button>
    </td>
  ) : (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
        onClick={() => props.edit(dataItem)}
        disabled={userRoll !== 'Admin'}
      >
        Edit
      </button>

      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
        onClick={() =>
          confirm('Confirm deleting: ' + dataItem.name) &&
          props.remove(dataItem)
        }
        disabled={userRoll !== 'Admin'}
      >
        Remove
      </button>
    </td>
  );
};
export default Buttons;
 