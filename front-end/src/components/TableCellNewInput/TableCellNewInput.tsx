import { TableCell } from "@mui/material";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableCellNewInput = ({ onChange }: Props) => {
  return (
    <TableCell align="left">
      <input size={5} type="text" onChange={onChange} />
    </TableCell>
  );
};

export default TableCellNewInput;
