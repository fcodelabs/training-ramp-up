import Button from '@mui/material/Button';

const RemoveButton = ()=>{
    return(
            <Button sx={{ height: 30, backgroundColor:'#f0f8ff', color:"black",marginLeft:1,'&:hover': {backgroundColor: 'coral',}}}>
                Remove
            </Button>
    );
};

export default RemoveButton;