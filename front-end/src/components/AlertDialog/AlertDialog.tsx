import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface AlertDialogProps {
  title: string;
  buttonText1?: string;
  buttonText2?: string;
  isOpen: boolean;
  handleClickFirstButton?: () => void;
  handleClickSecondButton?: () => void;
  handleClose?: () => void;
}

export default function AlertDialog({
  title,
  buttonText1,
  buttonText2,
  isOpen,
  handleClickFirstButton,
  handleClickSecondButton,
  handleClose,
}: AlertDialogProps) {
  const handleSingleButtonClick = () => {
    handleClose?.(); 
  };

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: "calc(100% - 32px)",
          maxWidth: "444px",
          maxHeight: 435,
          borderRadius: "12px",
        },
      }}
      open={isOpen}
      onClose={handleClose} 
    >
      <DialogTitle sx={{ fontSize: "16px" }}>{title}</DialogTitle>
      <DialogActions>
        {buttonText1 && (
          <Button
            onClick={handleClickFirstButton || handleSingleButtonClick}
            autoFocus
            color="secondary"
          >
            {buttonText1}
          </Button>
        )}
        {buttonText2 && (
          <Button onClick={handleClickSecondButton}>{buttonText2}</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
