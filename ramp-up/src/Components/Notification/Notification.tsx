import * as React from 'react';
import { Dialog, DialogContent, Typography, Button, Backdrop } from '@mui/material';
import styled from 'styled-components';

interface ErrorPopupProps {
  open: boolean;
  onSubmit: () => void,
  onClose: () => void;
  type: string;
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
        min-width: 300px;
      }}
`;

const StyledButton = styled(Button)`
  border: none !important;
  margin-left: 4px !important;
  margin-right: 0px !important;
  padding: 5px !important;
`;
const NotificationPopup: React.FC<ErrorPopupProps> = ({ open, onClose, type, onSubmit }) => {
  let errorMessage = '';
  let button :React.ReactNode = null;

  const ButtonSet: React.FC = () => {
    return <>
      <StyledButton variant="outlined" color="primary" onClick={onClose}>
        Dismiss
      </StyledButton>
      <StyledButton variant="outlined" color="secondary" onClick={onSubmit}>
        Confirm
      </StyledButton>
    </>;
  }

  const SingleButton: React.FC<{ text: string }> = ({ text }) => {
    return <>
      <StyledButton variant="outlined" color="primary" onClick={onClose}>
        {text}
      </StyledButton>
    </>;
  }

  if (type === 'TABLE_ERROR') {
    errorMessage = 'Unable to retrieve table details. Please try again later.';
    button = <ButtonSet />
  }
  else if (type === 'ADD_USER') { //done
    errorMessage = 'A new student added successfully';
    button = <SingleButton text='Confirm' />
  }
  else if (type === 'SAVE_USER'){ //done
    errorMessage = 'Student details updated successfully';
    button = <SingleButton text='Confirm' />
  }
  else if (type === 'MISSING_FIELDS'){  //done
    errorMessage = 'Mandatory fields missing.'
    button = <SingleButton text='keep editing' />
  }
  else if (type === 'DISCARD_CHANGES') { //done
    errorMessage = 'Discard changes?'
    button = <ButtonSet />
  }
  else if (type === 'SAVE_NEW_USER') { //done
    errorMessage = 'A new student added successfully';
    button = <SingleButton text='ok' />}

  else if (type === 'FAIL_SAVE_NEW_USER') {//done
    errorMessage = 'Unable to add the new student. Please try again later';
    button = <SingleButton text='Try Again' />
  }
  else if (type === 'FAIL_UPDATE_USER') { //done
    errorMessage = 'Cannnot update the student details. Please try again later';
    button = <SingleButton text='Try Again' />}
  else if (type === 'DELETE_USER') {
    errorMessage = 'Are you sure you want to remove this student?';
    button = <ButtonSet />
  }
  else if (type === 'DELETE_USER_SUCCESS') {
    errorMessage = 'Student deleted successfully';
    button = <SingleButton text='ok' />
  }




  return (
    <div>
      <StyledBackdrop open={open} />
      <StyledDialogContent open={open} onClose={onClose}>
        <DialogContent>
          <Typography variant="body1">{errorMessage}</Typography>
          <ButtonWrapper>
            {button}
          </ButtonWrapper>
        </DialogContent>
      </StyledDialogContent>
    </div>
  );
};

export default NotificationPopup;



