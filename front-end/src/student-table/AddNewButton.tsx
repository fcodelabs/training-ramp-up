import Button from '@mui/material/Button';
import Box from '@mui/material/Box'

interface Props{
    label:string
    onClick:()=>void
}

const AddNewButton = ({label,onClick}:Props)=>{

    return(
        <>
            <Box
            m={0} //margin
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            >
                <Button sx={{ height: 30, backgroundColor:'#f0f8ff',color:'black'}} onClick={onClick}>
                    {label}
                </Button>
            </Box>
        </>

    );
};

export default AddNewButton;