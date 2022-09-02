/* eslint-disable react/prop-types */
import { Button } from "@progress/kendo-react-buttons";

export const MyCommandCell = (props) => {
  const { dataItem } = props;
  const inEdit = dataItem[props.editField];
  const isNewEntry = dataItem.new;
  return inEdit ? (
    <td className="k-command-cell">
      <Button
        onClick={() =>
          isNewEntry ? props.add(dataItem) : props.update(dataItem)
        }
      >
        {isNewEntry ? "Add" : "Update"}
      </Button>
      <Button
        onClick={() =>
          isNewEntry ? props.discard(dataItem) : props.cancel(dataItem)
        }
      >
        {isNewEntry ? "Discard Changes" : "Cancel"}
      </Button>
    </td>
  ) : (
    <td className="k-command-cell">
      <Button
        style={{ backgroundColor: "rgb(239, 109, 109)", color: "white" }}
        onClick={() => props.edit(dataItem)}
      >
        Edit
      </Button>
      <Button onClick={() => props.remove(dataItem)}>Remove</Button>
    </td>
  );
};
