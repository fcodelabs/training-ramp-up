/* eslint-disable react/prop-types */
import { Button } from "@progress/kendo-react-buttons";
import * as yup from "yup";

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

export const MyCommandCell = (props) => {
  const { dataItem } = props;
  const inEdit = dataItem[props.editField];
  const isNewEntry = dataItem.new;

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
              isNewEntry ? props.add(dataItem) : props.update(dataItem);
            })
            .catch(() => {
              window.alert("Invalid data");
            });
        }}
      >
        {isNewEntry ? "Add" : "Update"}
      </Button>
      <Button
        style={isNewEntry ? { marginBottom: "10px" } : {}}
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
