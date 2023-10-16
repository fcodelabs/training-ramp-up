import Button from '@mui/material/Button';

interface Props{
    label:string,
    backgroundColor:string,
    color:string,
    onClick:()=> void,
}

const CustomizeButton = ({label,backgroundColor,color, onClick}:Props)=>{
    return(
            <Button onClick={onClick} sx={{ height: 30, backgroundColor:{backgroundColor}, color:{color},marginRight:1,'&:hover': {backgroundColor: 'coral',}} }>
                {label}
            </Button>
    );
};

export default CustomizeButton;