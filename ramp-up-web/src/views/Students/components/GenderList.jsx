/* eslint-disable react/prop-types */
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { getGender, genderChange } from "../utils/functions";

const GenderList = (props) => {
  const { dataItem } = props;
  return (
    <td>
      <DropDownList
        data={["Male", "Female"]}
        disabled={!dataItem.inEdit}
        defaultValue={getGender(dataItem)}
        onChange={(e) => {
          const gender = e.value;
          genderChange(gender, dataItem);
        }}
      />
    </td>
  );
};

export default GenderList;
