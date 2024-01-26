import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


interface AlertDialogProps {
  title: string;
  buttonText: string;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OneButtonDialog({ title, buttonText, isOpen, setOpen }: AlertDialogProps) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        sx={{ '& .MuiDialog-paper': { width:'calc(100% - 32px)', maxWidth: '444px', maxHeight: 435, borderRadius:'12px' } }}
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
