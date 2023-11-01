import React from "react";
import { render, screen } from "@testing-library/react";
import { Table, TableBody, TableRow } from "@mui/material";
import TableCellNewInput from "../../TableCellNewInput/TableCellNewInput";

describe("TableCellNewInput Component", () => {
  it("renders with the default value and handles change", () => {
    const onChange = jest.fn();
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCellNewInput onChange={onChange} />
          </TableRow>
        </TableBody>
      </Table>
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });
});
