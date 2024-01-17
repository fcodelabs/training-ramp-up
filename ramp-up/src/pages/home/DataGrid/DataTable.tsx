import React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef,GridRowHeightParams } from '@mui/x-data-grid';
import { Box, Button, TextField} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector, } from 'react-redux';
import { RootState } from '../../../redux/store';
import ErrorModal from '../../../components/ErrorModal/ErrorModal';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { addStudent,removeStudent } from '../../../redux/slices/studentSlice';
import { useDispatch } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import convertDate from '../../../utility/convertDate';
import validateMobile from '../../../utility/validateMobile';
import {
  GridRowModel,
  GridRowId,
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  GridToolbarContainer,
  GridEventListener,
  GridRowEditStopReasons,
  GridRenderCellParams,
} from '@mui/x-data-grid';

const styles = {
  validateError: {
    marginLeft: '0px',
    whiteSpace: 'normal',
    display: 'flex',
    alignItems: 'flex-start',
    width:"100%",
    flexDirection: 'column' as "column",
    color:"#D32F2F",
    fontSize:"9px",
    fontWeight:400,
    lineHeight:"100%",
    fontStyle:"normal",
    fontFamily:"Roboto",
    fontFeatureSettings:"'clig' off, 'liga' off",
  },
  addNewDiv:{
    padding: "8px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "16px",
    alignSelf: "stretch",
},
  addNewButton:{
    fontWeight:500,
    letterSpacing: "0.4px",
    fontSize: "14px",
    fontFamily: "Roboto,sans-serif",
    fontStyle: "normal",
    lineHeight: "24px",
    backgroundColor: "#2196F3",
  },
}

const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            width: 'auto',
            fontSize: '13px',
            fontFamily: 'Roboto,sans-serif',
            fontWeight: 500,
            lineHeight: '22px',
            letterSpacing: '0.46px',
            padding: '4px 10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:'var(--borderRadius, 4px)',
          },
        },
      },
    },
    
});

const StyledDatePicker = styled(DatePicker)<IStyledProps>(({ missing }) => ({
  width:"129px",
    height:"52px",
    border: missing ? "1px solid #D32F2F":"1px solid var(--primary-main, #2196F3)",
    background: "var(--background-paper-elevation-0, #FFF)",
    boxShadow: "0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
    '&:hover': {
      outline: 'none',
  },
  '& .MuiOutlinedInput-root': {
      '& fieldset': {
          borderColor: 'transparent',
      },
      '&:hover fieldset': {
          borderColor: 'transparent',
      },
      '&.Mui-focused fieldset': {
          borderColor: 'transparent',
      },
  },
  "& .MuiPickersDay-daySelected": {
    // Styles for the selected date text
    color: "red", // Change the color to your desired value
  },
}));

const StyledTextField = styled(TextField)<IStyledProps>(({ missing }) => ({
    width:"129px",
    height:"52px",
    border: missing ? "1px solid #D32F2F":"1px solid var(--primary-main, #2196F3)",
    background: "var(--background-paper-elevation-0, #FFF)",
    boxShadow: "0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
    '&:hover': {
      outline: 'none',
  },
  '& .MuiOutlinedInput-root': {
      '& fieldset': {
          borderColor: 'transparent',
      },
      '&:hover fieldset': {
          borderColor: 'transparent',
      },
      '&.Mui-focused fieldset': {
          borderColor: 'transparent',
      },
  },

}));

const StyledSelect = styled(Select)<IStyledProps>(({ missing }) => ({  
    width:"129px",
    height:"52px",
    border: missing ? "1px solid #D32F2F":"1px solid var(--primary-main, #2196F3)",
    background: "var(--background-paper-elevation-0, #FFF)",
    /* elevation/2 */
    boxShadow: "0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
    borderRadius:0,
   
'& .MuiOutlinedInput-notchedOutline': {
  borderColor: 'transparent',
},
'&:hover .MuiOutlinedInput-notchedOutline': {
  borderColor: 'transparent',
},
'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
  borderColor: 'transparent',
},
}));

const StyledDataGrid = styled(DataGrid)((theme) => ({
  "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
  {
    outline: "none !important",
  },
  "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
    outline: "none !important",
  },
    "& .MuiDataGrid-columnHeaderTitle": {
        fontWeight: 400, 
    },
    "& .MuiDataGrid-columnHeaders": {
        fontWeight: 400,
        borderRadius: "var(--none, 0px)",
        borderBottom: "1px solid var(--divider, rgba(0, 0, 0, 0.12))",
        borderLeft: "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
        borderRight: "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
        borderTop: "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
        background: "var(--primary-selected, rgba(33, 150, 243, 0.08))",
    },
    "& .MuiDataGrid-sortIcon": {
        opacity: 'inherit !important',
      },
      
    "& .MuiDataGrid-iconButtonContainer": {
        visibility: 'visible',
      }
    }
));

interface IStyledProps {
  missing: boolean;
}
   
interface IEditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function DataTable(){

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.student.students);

  const [rows, setRows] = useState(data.map((item) => ({ ...item, isNew: false })));
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [errorModal, setErrorModal] = useState<JSX.Element | null>(null);
  const[invalidMobile,setInvalidMobile] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [add, setAdd] = useState(false);
  

  useEffect(() => {
    setRows(data.map((item) => ({ ...item, isNew: false })));
  }, [data]);

  const showErrorModel = (dismiss:boolean,message:string,onClick:()=>void,buttonName:string) =>()=> {
    setErrorModal(
      <ErrorModal open={true} onClose={onClose} message={message} dismiss={dismiss} buttonName={buttonName} onClick={onClick}/>
    );
  }

  const onClose = ()=>{
    setErrorModal(null);
  }

  function EditToolbar(props: IEditToolbarProps) {
    const { setRows, setRowModesModel } = props;
  
    const handleClick = () => {
      const id =rows.length > 0 ? rows.length + 1 : 1;
      setRows((oldRows) => [{ id, age:null, mobile:'',name:'',dob:'',gender:'', address:'',isNew: true },...oldRows ]);
      setRowModesModel((oldModel) => ({...oldModel, [id]: { mode: GridRowModes.Edit }}));
    };
  
    return (
      <GridToolbarContainer
      sx={styles.addNewDiv}
      >
        <div style={styles.addNewDiv}>
                <Button 
                variant="contained" 
                sx={styles.addNewButton}
                onClick={handleClick}
                >
                Add new
                </Button>
            </div>
      </GridToolbarContainer>
    );
  }
  
  const columns: GridColDef[] = [
    { 
      field: 'id',
      type: 'number', 
      headerName: 'ID',
      sortable: false,
      align:'left',
      headerAlign:'left',
    },

    { 
      field: 'name', 
      headerName: 'Name',
      width:137,
      editable: true,
      renderEditCell: (params) => {
        let missing = false; 
        if(params.value === '' && add) {
          missing = true;
        }
          return (
            <StyledTextField missing={missing}
            value={params.value as string}
            onChange={(event) => {
                params.api.setEditCellValue({ 
                id: params.id, 
                field: params.field,
                value: event.target.value });
                setRows(prevState => {
                  const rowIndex = prevState.findIndex(row => row.id === params.id);
                  const newRow = { ...prevState[rowIndex], [params.field]: event.target.value };
                  return [...prevState.slice(0, rowIndex), newRow, ...prevState.slice(rowIndex + 1)];
                });
            }}
            />
          );
        }
    },

    { field: 'gender', 
      headerName: 'Gender', 
      sortable: false, 
      width:137 ,
      editable: true,
      renderEditCell: (params) => {
        let missing = false; 
        if(params.value === '' && add) {
          missing = true;
        }
          return (
            <StyledSelect missing={missing}
            value={params.value}
            onChange={(event) => {
              params.api.setEditCellValue({ 
                id: params.id, 
                field: params.field, 
                value: event.target.value 
              });
              setRows(prevState => {
                const rowIndex = prevState.findIndex(row => row.id === params.id);
                const newRow = { ...prevState[rowIndex], [params.field]: event.target.value };
                return [...prevState.slice(0, rowIndex), newRow, ...prevState.slice(rowIndex + 1)];
              });
            }}
            defaultValue=''
        >
            <MenuItem value='Male'>Male</MenuItem>
            <MenuItem value='Female'>Female</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>
        </StyledSelect>
        );
      },
    },

    { field: 'address', 
      headerName: 'Address', 
      sortable: false, 
      width:137,
      editable: true,
      renderEditCell: (params:GridRenderCellParams <any, string>) => {
        let missing = false; 
        if(params.value === '' && add) {
          missing = true;
        }
      return(
        <StyledTextField missing={missing}
        value={params.value}
        onChange={(event) => {
          params.api.setEditCellValue({ 
            id: params.id, field: 
            params.field, 
            value: event.target.value });
            setRows(prevState => {
              const rowIndex = prevState.findIndex(row => row.id === params.id);
              const newRow = { ...prevState[rowIndex], [params.field]: event.target.value };
              return [...prevState.slice(0, rowIndex), newRow, ...prevState.slice(rowIndex + 1)];
            });
        }}
        />   
      );    
      },
    },

    { field: 'mobile', 
      headerName: 'Mobile No:', 
      sortable: false,
      width:137,
      editable: true,
      renderEditCell: (params) => {
        const mobile = params.value as string;
        const mobileWithoutHyphens = mobile.replace(/-/g, '');
        const validation = validateMobile(mobileWithoutHyphens);
        let missing = false; 
        (mobileWithoutHyphens === '' && add) ? missing = true : missing = false;
        if(validation || (mobileWithoutHyphens === '')) {
          setInvalidMobile(false);
         }
         else{
          setInvalidMobile(true);
          missing=true;
         }
          return (
            <StyledTextField missing={missing}
            value={mobileWithoutHyphens}
            helperText = {(invalidMobile && mobileWithoutHyphens!=='') ? 'Please enter a valid phone number':null}
            FormHelperTextProps={{
              style: styles.validateError,
            }}
            onChange={(event) => {
              params.api.setEditCellValue({ 
                id: params.id, 
                field: params.field, 
                value: event.target.value });
                setRows(prevState => {
                  const rowIndex = prevState.findIndex(row => row.id === params.id);
                  const newRow = { ...prevState[rowIndex], [params.field]: event.target.value };
                  return [...prevState.slice(0, rowIndex), newRow, ...prevState.slice(rowIndex + 1)];
                });
            }}
            />
        );
          
      },
    },

    { field: 'dob', 
      headerName: 'Date of Birth',
      width:175,
      type: 'date',
      editable: true,
      renderCell: (params) => (
        <span>{new Date(params.value).toDateString()}</span>
      ),
      renderEditCell: (params) => {
        let missing = false; 
        if(params.value === '' && add) {
          missing = true;
        }
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledDatePicker missing={missing}
              sx={{
                width:"168px",
                
                "&MuiOutlinedInput-input":{
                  color: "var(--text-primary, rgba(0, 0, 0, 0.87))",
                  fontFeatureSettings: "'clig' off, 'liga' off",
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  letterSpacing: "0.17px",
                  lineHeight: "143%",
                },
                "& .MuiFormHelperText-root ":{
                  display: "none"
                },
                '& .MuiPickersBasePicker-container': {
                  overflow: 'hidden',
                },
              }}
              value={params.value ? dayjs(params.value) : null}
              onChange={(newValue) => {
                  const dateValue = dayjs(newValue as Date).toDate();
                  params.api.setEditCellValue({ 
                    id: params.id, 
                    field: params.field, 
                    value: newValue});
                    handleDateOfBirthChange(params, newValue as Date);
                    setRows(prevState => {
                      const rowIndex = prevState.findIndex(row => row.id === params.id);
                      const newRow = { ...prevState[rowIndex], [params.field]: dateValue };
                      return [...prevState.slice(0, rowIndex), newRow, ...prevState.slice(rowIndex + 1)];
                    });
                    
                }}
                format="ddd MMM DD YYYY" 
                maxDate={dayjs()}
                // maxDate={new Date()}
              />
            </LocalizationProvider>
        );
      },
    },

    { field: 'age', 
      headerName: 'Age', 
      sortable: false,
      minWidth:100,
      editable: true,
      renderEditCell: (params) => {
          let missing = false; 
        if((params.value === null && add) || (params.value<18 && params.value !== null)) {
          missing = true;
        }
          return [
            <StyledTextField missing={missing}
            type='number'
            value={params.value}
            helperText={ (params.value<18 && params.value !== null)? 'Individual is below the minimum age allowed' : null}
            FormHelperTextProps={{
              style: styles.validateError,
            }}
            InputProps={{ readOnly: true }}
              onChange={(event) => {
              params.api.setEditCellValue({ 
                id: params.id, 
                field: params.field, 
                value: event.target.value });
          }}
         
            />
          ];  
      },
    },

      {
        field: 'actions',
        type: 'actions',
        headerName: 'Action',
        width: 200,
        cellClassName: 'actions',
        getActions: (params ) => {
          const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;
          if (isInEditMode) {
            if(params.row.isNew){
              return[
            <div 
            style={{
                display:"flex",
                justifyContent:"flex-start",
                flexDirection:"column",
                gap:"9px",
                
                }}>
                  <ThemeProvider theme={theme}>
                  <Button 
                  sx={{
                    width:"47px",
                  }}
                  variant='outlined'
                  onClick={handleAddUpdate(params.row)}
                  >
                  add
                  </Button>
                  </ThemeProvider>
              
                  <ThemeProvider theme={theme}>
                  <Button 
                  variant='outlined' 
                  color='error'
                  onClick={showErrorModel(true,'Discard changes?',handleDiscardChanges(params.id),'Discard')}
                  >discard changes</Button>
                  </ThemeProvider>
            </div>]
              
             }
              else{
              return[
                <div 
                style={{
                    display:"flex",
                    flexDirection:"row",
                    gap:"9px",
                    
                    }}>
                      <ThemeProvider theme={theme}>
                      <Button 
                      variant='outlined'
                      onClick={handleAddUpdate(params.row)}
                      >
                      update
                      </Button>
                      </ThemeProvider>
                  
                      <ThemeProvider theme={theme}>
                      <Button 
                        variant='outlined' 
                        color='error'
                        onClick={showErrorModel(true,'Discard changes?',handleCancelClick(params.id),'Discard')}
                        >
                          cancel
                        </Button>
                      </ThemeProvider>
                </div>]
               }
           }
          else{
            return [
              <div 
              style={{
                  display:"flex",
                  flexDirection:"row",
                  gap:"32px",
                  }}>
                    <ThemeProvider theme={theme}>
                    <Button 
                    variant='outlined'
                    onClick={() => {
                      setRowModesModel({ ...rowModesModel, [params.id]: { mode: GridRowModes.Edit } });
                    }}
                    > 
                    edit
                    </Button>
                    </ThemeProvider>
                
                    <ThemeProvider theme={theme}>
                    <Button 
                    variant='outlined' 
                    color='error'
                    onClick={() => {
                      showErrorModel(true,'Are you sure you want to remove this student?',handleRemoveClick(params.id),'confirm')();
                    }}
                    >
                    remove</Button>
                    </ThemeProvider>
              </div>
            ];
          }},
      }]


      const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      };

      const handleDiscardChanges = (id: GridRowId) => () => {
        setRows((oldRows) => oldRows.filter((row) => row.id !== id));
        setErrorModal(null)
      }
      const handleCancelClick = (id: GridRowId) => () => {
        setCancel(true);
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        setErrorModal(null);
      }

      const handleRemoveClick = (id: GridRowId) => () => {
        try{
          dispatch(removeStudent(id));
          showErrorModel(false,'The student removed successfully',onClose,'ok')();
        }
        catch(error){

        }
      }

      const handleAddUpdate= (row: GridRowModel) =>()=>{
        setAdd(true);
        if((Object.values(row).some(value => value === '' || value === null || value === undefined))|| row.age<18||invalidMobile){
          showErrorModel(false,'Mandatory fields missing', onClose,'keep editing')();
        }
        else{
          handleSaveClick(row.id)();
        }
      }

      
  const processRowUpdate = (newRow: GridRowModel) => {
    const mobile = newRow.mobile;
    const mobileWithoutPlus = mobile.replace(/^\+/, '');
    const formattedMobile = mobileWithoutPlus.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    const updatedRow = { ...newRow, isNew: false,mobile:formattedMobile } as GridRowModel;
    if(cancel){
      const prevRow = {...data.find(row => row.id === newRow.id),isNew:false} as GridRowModel;
      setCancel(false);
      return Promise.resolve(prevRow);
    }
    else
    try{
      dispatch(addStudent(updatedRow));
      if(newRow.isNew){  
        showErrorModel(false,'A new student added successfully',onClose,'ok')();
      }
      else{
        showErrorModel(false,'Student details updated successfully',onClose,'ok')();
      }
    }
    catch(error){
      showErrorModel(false,'Unable to add the student.Please try again later',onClose,'Try Again')();
    }
    return Promise.resolve(updatedRow);
  };

    
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleDateOfBirthChange = (params: GridRenderCellParams<any, string>, date:Date) => {
    const age = convertDate(date.toString());
    params.api.setEditCellValue({ id: params.id, field: 'age', value: age });
    setRows(prevState => {
      const rowIndex = prevState.findIndex(row => row.id === params.id);
      const newRow = { ...prevState[rowIndex], age: age };
      return [...prevState.slice(0, rowIndex), newRow, ...prevState.slice(rowIndex + 1)];
    });
  };

    return(
     <Box 
     style={{ height: 400, width: '100%' }}
     sx={{
      '& .super-app-edit-cell': {
        backgroundColor: 'rgba(224, 183, 60, 0.55)',
          color: '#1a3e72',
          fontWeight: '600',
      }
     }}
     >
       <div>
        {errorModal}
      </div>
      
      <StyledDataGrid
        sx={{ '&, [class^=MuiDataGrid-root]': {
                   border: 'none' 
                  },
                 
              '& .MuiDataGrid-sortIcon': {
                marginLeft: '20px', // Adjust as needed
              },
                   }}
        rows={rows} 
        columns={columns}
        getRowHeight={(params: GridRowHeightParams) =>{
          const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;
  
          if (isInEditMode){
            console.log(params.id);
            return 100;
          }
        else{
          return 'auto';
        }
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableColumnMenu={true}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        onCellDoubleClick={(params, event) => {
          event?.stopPropagation();
        }} 
        onCellClick={(params, event) => {
          event.stopPropagation();
        }}
      
      />
        </Box>
    );
}

export default DataTable;