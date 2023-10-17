import { TableCell } from "@mui/material";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
}

const TableCellInput = ({ onChange, placeHolder }: Props) => {
  return (
    <TableCell align="left">
      <input
        size={5}
        type="text"
        onChange={onChange}
        placeholder={placeHolder}
      />
    </TableCell>
  );
};

export default TableCellInput;
