import * as React from "react";
import "../utils/commandCell.css";

function CommandCell(prop) {
  const { dataItem, role } = prop;
  const inEdit = dataItem[prop.editField];
  const isNewItem = dataItem.id === undefined;
  return inEdit ? (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
        id="addBtn"
        onClick={() => (isNewItem ? prop.add(dataItem) : prop.update(dataItem))}
        disabled={role === "admin" ? false : true}
      >
        {isNewItem ? "Add" : "Update"}
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
        onClick={() =>
          isNewItem ? prop.discard(dataItem) : prop.cancel(dataItem)
        }
        disabled={role === "admin" ? false : true}
      >
        {isNewItem ? "Discard Changes" : "Cancel"}
      </button>
    </td>
  ) : (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
        id="editBtn"
        onClick={() => prop.edit(dataItem)}
        disabled={role === "admin" ? false : true}
      >
        Edit
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
        onClick={() =>
          confirm("Confirm deleting: ", dataItem.name) && prop.remove(dataItem)
        }
        disabled={role === "admin" ? false : true}
      >
        Remove
      </button>
    </td>
  );
}

export default CommandCell;
