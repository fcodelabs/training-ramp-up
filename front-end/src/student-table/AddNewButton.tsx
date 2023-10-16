import Button from '@mui/material/Button';
import Box from '@mui/material/Box'

const AddNewButton = ()=>{
    return(
        <>
            <Box
            m={0} //margin
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            >
                <Button sx={{ height: 30, backgroundColor:'#f0f8ff',color:'black'}}>
                    Add New
                </Button>
            </Box>
        </>

    );
};

export default AddNewButton;