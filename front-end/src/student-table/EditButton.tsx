import Button from '@mui/material/Button';

const EditButton = ()=>{
    return(
            <Button sx={{ height: 30, backgroundColor:'red', color:"white",'&:hover': {backgroundColor: 'coral',}}}>
                Edit
            </Button>
    );
};

export default EditButton;