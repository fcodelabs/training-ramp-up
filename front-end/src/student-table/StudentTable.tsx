import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditButton from './EditButton';
import RemoveButton from './RemoveButton';

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
'&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
},
'&:last-child td, &:last-child th': {
    border: 0,
},
}));

const data = [
    {id:1, name:"John",gender:"male",address:"Homagama",mobile_no:"011258989",date_of_birth:"1999-12-5",age:25},
    {id:2,name:"Ann",gender:"female",address:"Horana",mobile_no:"011258989",date_of_birth:"1998-12-5",age:26},
    {id:3,name:"Ron",gender:"male",address:"Colombo",mobile_no:"011241989",date_of_birth:"1969-12-15",age:58},
]

const StudentTable = ()=>{
    return(
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
                    {data.map((val,key)=>{
                        return(
                            <StyledTableRow key={key}>
                                <TableCell align="left">{val.id}</TableCell>
                                <TableCell align="left">{val.name}</TableCell>
                                <TableCell align="left">{val.gender}</TableCell>
                                <TableCell align="left">{val.address}</TableCell>
                                <TableCell align="left">{val.mobile_no}</TableCell>
                                <TableCell align="left">{val.date_of_birth}</TableCell>
                                <TableCell align="left">{val.age}</TableCell>
                                <TableCell align="left"><EditButton/><RemoveButton/></TableCell>
                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StudentTable;