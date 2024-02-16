import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
  title: string;
  buttonText1: string;
  buttonText2: string;
  isOpen: boolean;
  handleClickFirstButton: () => void;
  handleClickSecondButton: () => void;
}

export default function TwoButtonDialog({ title, buttonText1, buttonText2, isOpen,handleClickFirstButton,handleClickSecondButton }: AlertDialogProps) {
  return (
    <React.Fragment>
      <Dialog
        sx={{ '& .MuiDialog-paper': { width:'calc(100% - 32px)', maxWidth: '444px', maxHeight: 435 } }}
        open={isOpen}
      >
        <DialogTitle sx={{fontSize:'16px'}}>
          {title}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClickFirstButton} autoFocus color='secondary'>
            {buttonText1}
          </Button>
          <Button onClick={handleClickSecondButton} >
            {buttonText2}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
