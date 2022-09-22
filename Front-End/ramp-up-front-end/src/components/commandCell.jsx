import * as React from "react";

function CommandCell(prop) {
  const { dataItem } = prop;
  const inEdit = dataItem[prop.editField];
  const isNewItem = dataItem.studentID === undefined;
  return inEdit ? (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
        onClick={() => (isNewItem ? prop.add(dataItem) : prop.update(dataItem))}
      >
        {isNewItem ? "Add" : "Update"}
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
        onClick={() =>
          isNewItem ? prop.discard(dataItem) : prop.cancel(dataItem)
        }
      >
        {isNewItem ? "Discard Changes" : "Cancel"}
      </button>
    </td>
  ) : (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
        onClick={() => prop.edit(dataItem)}
      >
        Edit
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
        onClick={() =>
          confirm("Confirm deleting: ", dataItem.StudentName) &&
          prop.remove(dataItem)
        }
      >
        Remove
      </button>
    </td>
  );
}

export default CommandCell;
