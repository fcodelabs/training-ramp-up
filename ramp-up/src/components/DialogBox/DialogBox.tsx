import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

interface CustomDialogBoxProps {
  open: boolean
  onClose: () => void
  dialogContent: string
  buttonLabel: string
  buttonAction: () => void
  secondary?: boolean | null
  secondaryButtonLabel?: string | null
  secondaryButtonAction?: () => void
}

export default function DialogBox({
  open,
  onClose,
  dialogContent,
  buttonLabel,
  buttonAction,
  secondary,
  secondaryButtonLabel,
  secondaryButtonAction,
}: CustomDialogBoxProps) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              color: '#000000',
              width: '300px',
              height: '20px',
              padding: '8px 20px 8px 10px',
            }}
          >
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {secondary ? (
            <Button
              style={{ color: '#9C27B0' }}
              onClick={secondaryButtonAction}
            >
              {secondaryButtonLabel}
            </Button>
          ) : null}
          <Button onClick={buttonAction} autoFocus>
            {buttonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
