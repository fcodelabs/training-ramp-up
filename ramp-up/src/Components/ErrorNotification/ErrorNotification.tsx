import * as React from 'react';
import { Dialog, DialogContent, Typography, Button, Backdrop } from '@mui/material';
import styled from 'styled-components';

interface ErrorPopupProps {
    open: boolean;
    onClose: () => void;
}

const ButtonWrapper = styled.div`
  padding: 15px 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const StyledBackdrop = styled(Backdrop)`
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: #fff;
`;

const StyledDialogContent = styled(Dialog)`
  && {
    .MuiPaper-root.MuiDialog-paper {
      margin: 0 !important;
      border-radius: 10px;
    }

  && {
    .MuiDialogContent-root {
        padding: 15px 20px 5px 20px !important;
      }}
`;

const StyledButton = styled(Button)`
  border: none !important;
  margin-left: 4px !important;
  margin-right: 0px !important;
  padding: 5px !important;
`;

const ErrorPopup: React.FC<ErrorPopupProps> = ({ open, onClose }) => {
    return (
        <div>
            <StyledBackdrop open={open} />
            <StyledDialogContent open={open} onClose={onClose}>
                <DialogContent>
                    <Typography variant="body1">Unable to retrieve table details. Please try again later.</Typography>
                    <ButtonWrapper>
                        <StyledButton variant="outlined" color="primary" onClick={onClose}>
                            Dismiss
                        </StyledButton>
                        <StyledButton variant="outlined" color="secondary" onClick={onClose}>
                            Confirm
                        </StyledButton>
                    </ButtonWrapper>
                </DialogContent>
            </StyledDialogContent>
        </div>
    );
};

export default ErrorPopup;
