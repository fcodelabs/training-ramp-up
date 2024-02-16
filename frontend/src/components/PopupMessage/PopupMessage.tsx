import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

interface IProps {
  open: boolean;
  title: string;
  handleClickFirstButton?: () => void;
  handleClickSecondButton: () => void;
  firstButtonName?: string;
  secondButtonName: string;
}

const PopupMessage = ({
  open,
  title,
  handleClickFirstButton,
  handleClickSecondButton,
  firstButtonName,
  secondButtonName,
}: IProps) => {
  return (
    <>
      <Dialog
        open={open}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "325px",
          },
        }}
      >
        <DialogTitle sx={{ fontSize: "16px", fontWeight: 400 }}>
          {title}
        </DialogTitle>
        <DialogActions>
          {firstButtonName && (
            <Button
              size="small"
              onClick={handleClickFirstButton}
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "rgba(156, 39, 176, 1)",
              }}
            >
              {firstButtonName}
            </Button>
          )}
          <Button
            size="small"
            onClick={handleClickSecondButton}
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "rgba(33, 150, 243, 1)",
            }}
          >
            {secondButtonName}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PopupMessage;
