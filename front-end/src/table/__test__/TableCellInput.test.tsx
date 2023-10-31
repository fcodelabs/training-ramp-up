import React from "react";
import { render, screen } from "@testing-library/react";
import TableCellInput from "../../components/TableCellInput/TableCellInput";
import { Table, TableBody, TableRow } from "@mui/material";

describe("TableCellInput Component", () => {
  it("renders with the default value and handles change", () => {
    const defaultValue = "Default Value";
    const onChange = jest.fn();
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCellInput defaultValue={defaultValue} onChange={onChange} />
          </TableRow>
        </TableBody>
      </Table>
    );

    const inputElement = screen.getByDisplayValue(defaultValue);
    expect(inputElement).toBeInTheDocument();
  });
});
