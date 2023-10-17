import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CustomizeButton from "./Button";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const data = [
  {
    id: 1,
    name: "John",
    gender: "male",
    address: "Homagama",
    mobileNo: "011258989",
    dateOfBirth: new Date("10/17/1999"),
    age: 25,
  },
  {
    id: 2,
    name: "Ann",
    gender: "female",
    address: "Horana",
    mobileNo: "011258989",
    dateOfBirth: new Date("10/17/1995"),
    age: 26,
  },
  {
    id: 3,
    name: "Ron",
    gender: "male",
    address: "Colombo",
    mobileNo: "011241989",
    dateOfBirth: new Date("10/17/1989"),
    age: 58,
  },
];

interface Props {
  visible: boolean;
  onDiscardClick: () => void;
}

const StudentTable = ({ visible, onDiscardClick }: Props) => {
  console.log(visible);
  const [editId, setEditId] = useState(-1);
  const [student, setStudent] = useState({
    id: -1,
    name: "",
    gender: "",
    address: "",
    mobileNo: "",
    dateOfBirth: new Date(),
    age: 0,
  });
  const clearStudentData = () =>
    setStudent({
      id: -1,
      name: "",
      gender: "",
      address: "",
      mobileNo: "",
      dateOfBirth: new Date(),
      age: 0,
    });
  console.log(student);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ID</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Gender</StyledTableCell>
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="left">Mobile No</StyledTableCell>
              <StyledTableCell align="left">Date of Birth</StyledTableCell>
              <StyledTableCell align="left">Age</StyledTableCell>
              <StyledTableCell align="left">Command</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visible && (
              <StyledTableRow>
                <TableCell align="left"></TableCell>
                <TableCell align="left">
                  <input
                    size={5}
                    type="text"
                    name="name"
                    onChange={(event) =>
                      setStudent({
                        ...student,
                        name: event.target.value,
                      })
                    }
                  />
                </TableCell>
                <TableCell align="left">
                  <input
                    size={5}
                    type="text"
                    name="gender"
                    onChange={(event) =>
                      setStudent({
                        ...student,
                        gender: event.target.value,
                      })
                    }
                  />
                </TableCell>
                <TableCell align="left">
                  <input
                    size={5}
                    type="text"
                    name="address"
                    onChange={(event) =>
                      setStudent({
                        ...student,
                        address: event.target.value,
                      })
                    }
                  />
                </TableCell>
                <TableCell align="left">
                  <input
                    size={5}
                    type="text"
                    name="mobile_no"
                    onChange={(event) =>
                      setStudent({
                        ...student,
                        mobileNo: event.target.value,
                      })
                    }
                  />
                </TableCell>
                <TableCell align="left">
                  <DatePicker
                    selected={student.dateOfBirth}
                    onChange={(date: Date) =>
                      setStudent({
                        ...student,
                        dateOfBirth: date,
                      })
                    }
                  />
                </TableCell>
                <TableCell align="left">age</TableCell>
                <TableCell align="left">
                  <div>
                    <CustomizeButton
                      label="Add"
                      color="black"
                      backgroundColor="#f0f8ff"
                      onClick={() => setEditId(-1)}
                    />
                  </div>
                  <div>
                    <CustomizeButton
                      label="Discard"
                      color="black"
                      backgroundColor="#f0f8ff"
                      onClick={() => {
                        onDiscardClick();
                        clearStudentData();
                      }}
                    />
                  </div>
                </TableCell>
              </StyledTableRow>
            )}
            {data.map((val, key) => {
              if (key === editId) {
                return (
                  <StyledTableRow key={key}>
                    <TableCell align="left">{val.id}</TableCell>
                    <TableCell align="left">
                      <input
                        size={5}
                        placeholder={val.name}
                        type="text"
                        name="name"
                        onChange={(event) =>
                          setStudent({
                            ...student,
                            name: event.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <input
                        size={5}
                        type="text"
                        name="gender"
                        placeholder={val.gender}
                        onChange={(event) =>
                          setStudent({
                            ...student,
                            gender: event.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <input
                        size={5}
                        type="text"
                        name="address"
                        placeholder={val.address}
                        onChange={(event) =>
                          setStudent({
                            ...student,
                            address: event.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <input
                        size={5}
                        type="text"
                        name="mobileNo"
                        placeholder={val.mobileNo}
                        onChange={(event) =>
                          setStudent({
                            ...student,
                            mobileNo: event.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <DatePicker
                        placeholderText={new Date(
                          val.dateOfBirth
                        ).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                        onChange={(date: Date) =>
                          setStudent({
                            ...student,
                            dateOfBirth: date,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell align="left">{val.age}</TableCell>
                    <TableCell align="left">
                      <div>
                        <CustomizeButton
                          label="Update"
                          color="black"
                          backgroundColor="#f0f8ff"
                          onClick={() => setEditId(2)}
                        />
                      </div>
                      <div>
                        <CustomizeButton
                          label="Cancel"
                          color="black"
                          backgroundColor="#f0f8ff"
                          onClick={() => {
                            setEditId(-1);
                            onDiscardClick();
                          }}
                        />
                      </div>
                    </TableCell>
                  </StyledTableRow>
                );
              } else {
                return (
                  <StyledTableRow key={key}>
                    <TableCell align="left">{val.id}</TableCell>
                    <TableCell align="left">{val.name}</TableCell>
                    <TableCell align="left">{val.gender}</TableCell>
                    <TableCell align="left">{val.address}</TableCell>
                    <TableCell align="left">{val.mobileNo}</TableCell>
                    <TableCell align="left">
                      {new Date(val.dateOfBirth).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell align="left">{val.age}</TableCell>
                    <TableCell align="left">
                      <CustomizeButton
                        label="Edit"
                        color="white"
                        backgroundColor="red"
                        onClick={() => setEditId(key)}
                      />
                      <CustomizeButton
                        label="Remove"
                        color="black"
                        backgroundColor="#f0f8ff"
                        onClick={() => setEditId(key)}
                      />
                    </TableCell>
                  </StyledTableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentTable;
