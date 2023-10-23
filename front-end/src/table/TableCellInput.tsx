import { TableCell } from "@mui/material";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue: string;
}

const TableCellInput = ({ onChange, defaultValue }: Props) => {
  return (
    <TableCell align="left">
      <input
        size={5}
        type="text"
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </TableCell>
  );
};

export default TableCellInput;
