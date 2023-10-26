import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CustomizeButton from "./Button";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import studentReducer, {
  addStudent,
  deleteStudent,
  fetchStudents,
  fetchStudentsSuccess,
  selectStudents,
  updateStudent,
} from "../redux/studentReducer";
import TableCellInput from "./TableCellInput";
import TableCellNewInput from "./TableCellNewInput";
import DatePicker from "react-datepicker";
import { RootState } from "../redux/store";
import { actionChannel } from "redux-saga/effects";

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

interface Props {
  visible: boolean;
  onDiscardClick: () => void;
}

const StudentTable = ({ visible, onDiscardClick }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  const existingStudent = useSelector((state: RootState) => state.students);
  console.log(existingStudent);

  // console.log("", dispatch(getStudent()));
  const maxId = existingStudent.reduce((max, student) => {
    return student.id > max ? student.id : max;
  }, 1);
  // Local
  const [editId, setEditId] = useState(-1);
  const [student, setStudent] = useState({
    id: 0,
    name: "",
    gender: "",
    address: "",
    mobileNo: "",
    dateOfBirth: "",
    age: 0,
  });

  const clearStudentData = () =>
    setStudent({
      id: 0,
      name: "",
      gender: "",
      address: "",
      mobileNo: "",
      dateOfBirth: "",
      age: 0,
    });
  // Calculate age
  const calculateAge = (dateOfBirth: Date) => {
    const today = new Date();
    let studentAge = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
    ) {
      studentAge--;
    }

    setStudent({
      ...student,
      dateOfBirth: dateOfBirth.toISOString(),
      age: studentAge,
    });
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    calculateAge(date);
  };

  //validations
  const validateForm = (action: string) => {
    if (student.name.length === 0) {
      return alert("Invalid Form, Name cannot be empty");
    }
    if (
      student.gender.toLowerCase() !== "male" &&
      student.gender.toLowerCase() !== "female"
    ) {
      return alert("Invalid Form, Gender should be Male or Female");
    }
    if (student.address.length === 0) {
      return alert("Invalid Form, Address cannot be empty");
    }
    if (student.mobileNo.length === 0) {
      return alert("Invalid Form, Mobile number cannot be empty");
    }
    if (student.dateOfBirth === "") {
      return alert("Invalid Form, Date of birth cannot be empty");
    }
    if (student.age <= 18) {
      return alert("Invalid Form, Age should greater than 18");
    }
    if (action === "Add") {
      return dispatch(addStudent(student));
    }
    if (action === "Edit") {
      return dispatch(updateStudent(student));
    }
  };
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
                <TableCellNewInput
                  onChange={(event) =>
                    setStudent({
                      ...student,
                      id: maxId + 1,
                      name: event.target.value,
                    })
                  }
                />
                <TableCellNewInput
                  onChange={(event) =>
                    setStudent({
                      ...student,
                      gender: event.target.value,
                    })
                  }
                />
                <TableCellNewInput
                  onChange={(event) =>
                    setStudent({
                      ...student,
                      address: event.target.value,
                    })
                  }
                />
                <TableCellNewInput
                  onChange={(event) =>
                    setStudent({
                      ...student,
                      mobileNo: event.target.value,
                    })
                  }
                />
                <TableCell align="left">
                  {" "}
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date) => {
                      calculateAge(date);
                      handleDateChange(date);
                    }}
                  />
                </TableCell>
                <TableCell align="left">{student.age}</TableCell>
                <TableCell align="left">
                  <div>
                    <CustomizeButton
                      label="Add"
                      color="black"
                      backgroundColor="#f0f8ff"
                      onClick={() => {
                        validateForm("Add");
                        clearStudentData();
                        onDiscardClick();
                      }}
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
            {existingStudent.map((val, key) => {
              if (key === editId) {
                return (
                  <StyledTableRow key={key}>
                    <TableCell align="left">{val.id}</TableCell>
                    <TableCellInput
                      defaultValue={val.name}
                      onChange={(event) => {
                        setStudent({
                          ...student,
                          name: event.target.value,
                        });
                      }}
                    />
                    <TableCellInput
                      defaultValue={val.gender}
                      onChange={(event) =>
                        setStudent({
                          ...student,
                          gender: event.target.value,
                        })
                      }
                    />
                    <TableCellInput
                      defaultValue={val.address}
                      onChange={(event) =>
                        setStudent({
                          ...student,
                          address: event.target.value,
                        })
                      }
                    />
                    <TableCellInput
                      defaultValue={val.mobileNo}
                      onChange={(event) =>
                        setStudent({
                          ...student,
                          mobileNo: event.target.value,
                        })
                      }
                    />
                    <TableCell align="left">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date: Date) => {
                          handleDateChange(date);
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">{student.age}</TableCell>
                    <TableCell align="left">
                      <div>
                        <CustomizeButton
                          label="Update"
                          color="black"
                          backgroundColor="#f0f8ff"
                          onClick={() => {
                            validateForm("Edit");
                            setEditId(-1);
                            clearStudentData();
                          }}
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
                            clearStudentData();
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
                      <div>
                        <CustomizeButton
                          label="Edit"
                          color="white"
                          backgroundColor="red"
                          onClick={() => {
                            onDiscardClick();
                            setEditId(key);
                            setStudent({
                              ...student,
                              ...val,
                            });
                            setSelectedDate(new Date(val.dateOfBirth));
                          }}
                        />
                        <CustomizeButton
                          label="Remove"
                          color="black"
                          backgroundColor="#f0f8ff"
                          onClick={() => dispatch(deleteStudent(val.id))}
                        />
                      </div>
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
