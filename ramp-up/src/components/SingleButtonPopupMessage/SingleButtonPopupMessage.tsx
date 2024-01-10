import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

interface Props {
  open: boolean;
  title: string;
  handleClick: () => void;
  buttonName: string;
}

const SingleButtonPopupMessage = ({
  open,
  title,
  handleClick,
  buttonName,
}: Props) => {
  return (
    <>
      <Dialog open={open}>
        <DialogTitle sx={{ fontSize: "16px", fontWeight: 400 }}>
          {title}
        </DialogTitle>
        <DialogActions>
          <Button
            size="small"
            onClick={handleClick}
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "rgba(33, 150, 243, 1)",
            }}
          >
            {buttonName}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SingleButtonPopupMessage;
