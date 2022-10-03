/* eslint-disable react/prop-types */
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { getBirthday, birthdayChange } from "../utils/functions";

const BirthdayPicker = (props) => {
  const { dataItem } = props;
  return (
    <td>
      <DatePicker
        format="dd/MM/yyyy"
        defaultValue={getBirthday(dataItem.birthday)}
        max={new Date()}
        disabled={!dataItem.inEdit}
        onChange={(e) => {
          if (
            e.value !== null &&
            e.value.getFullYear().toString().length === 4
          ) {
            const birthday = e.value.toLocaleDateString("en-GB");
            birthdayChange(birthday, dataItem);
          }
        }}
      />
    </td>
  );
};

export default BirthdayPicker;
