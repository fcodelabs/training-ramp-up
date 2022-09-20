import * as React from "react";

function CommandCell() {
  return (
    <td className="k-command-cell">
      <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command">
        Edit
      </button>
      <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command">
        Remove
      </button>
    </td>
  );
}

export default CommandCell;
