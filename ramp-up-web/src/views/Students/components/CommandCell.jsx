/* eslint-disable react/prop-types */
import { Button } from "@progress/kendo-react-buttons";
import * as yup from "yup";
import { startEdit, discardEntry, cancelChanges } from "../utils/functions";
import { editField } from "../../../constants";
import { useStore } from "react-redux";

const entrySchema = yup.object().shape({
  Name: yup.string().required(),
  Gender: yup.string().required(),
  Address: yup.string().required(),
  Number: yup
    .string()
    .required()
    .matches(/^[0-9]{10}$/),
  Birthday: yup.string().required(),
  Age: yup.string().required(),
});

const MyCommandCell = (props) => {
  const { dataItem } = props;
  const inEdit = dataItem[editField];
  const isNewEntry = dataItem.new;
  const store = useStore();

  return inEdit ? (
    <td className="k-command-cell">
      <Button
        style={
          isNewEntry
            ? { marginTop: "10px", marginBottom: "12px", marginLeft: "8px" }
            : {}
        }
        onClick={() => {
          entrySchema
            .validate(dataItem, { abortEarly: false })
            .then(() => {
              isNewEntry
                ? store.dispatch({ type: "addStudent", payload: dataItem })
                : store.dispatch({ type: "updateStudent", payload: dataItem });
            })
            .catch((e) => {
              alert(e);
            });
        }}
      >
        {isNewEntry ? "Add" : "Update"}
      </Button>
      <Button
        style={isNewEntry ? { marginBottom: "10px" } : {}}
        onClick={() =>
          isNewEntry ? discardEntry(dataItem) : cancelChanges(dataItem)
        }
      >
        {isNewEntry ? "Discard Changes" : "Cancel"}
      </Button>
    </td>
  ) : (
    <td className="k-command-cell">
      <Button
        style={{ backgroundColor: "rgb(239, 109, 109)", color: "white" }}
        onClick={() => startEdit(dataItem)}
      >
        Edit
      </Button>
      <Button
        onClick={() =>
          store.dispatch({ type: "deleteStudent", payload: dataItem })
        }
      >
        Remove
      </Button>
    </td>
  );
};

export default MyCommandCell;
