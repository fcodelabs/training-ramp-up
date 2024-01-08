import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export default function DialogBox() {
const [open, setOpen] = React.useState(false);
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('md'));




    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };



  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
       
      >
        {/* <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent sx={{ borderRadius: '10px' }}>
           <DialogContentText>
          Unable to retrieve table details. Please try again later.
          </DialogContentText> 
        </DialogContent> 
        <DialogActions>
          <Button autoFocus onClick={handleClose}
          style={{ color: '#9C27B0' }}>
            DISMISS
          </Button>
          <Button onClick={handleClose} autoFocus>
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
