import * as React from "react";
import { Student } from "../../utils/Interfaces/Student";

export const CommandCell = (props: {
  dataItem: Student;
  add: (param: Student) => void;
  edit: (param: Student) => void;
  update: (param: Student) => void;
  discard: () => void;
  cancel: (param: Student) => void;
  remove: (param: Student) => void;
  disable: boolean;
}) => {
  const { dataItem, disable } = props;
  const inEdit = dataItem.inEdit;
  const isNewItem = dataItem.id == undefined;

  return inEdit ? (
    <td className="k-command-cell">
      <button
        disabled={disable}
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
        onClick={() =>
          isNewItem ? props.add(dataItem) : props.update(dataItem)
        }
      >
        {isNewItem ? "Add" : "Update"}
      </button>
      <button
        disabled={disable}
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
        onClick={() => (isNewItem ? props.discard() : props.cancel(dataItem))}
      >
        {isNewItem ? "Discard" : "Cancel"}
      </button>
    </td>
  ) : (
    <td className="k-command-cell">
      <button
        disabled={disable}
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
        onClick={() => props.edit(dataItem)}
      >
        Edit
      </button>
      <button
        disabled={disable}
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
        onClick={() =>
          confirm("Confirm : " + dataItem.name) && props.remove(dataItem)
        }
      >
        Remove
      </button>
    </td>
  );
};
