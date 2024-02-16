import React, { useState } from 'react'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import { logout } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { Modal, Paper } from '@mui/material'
import DialogBox from '../DialogBox/DialogBox'

export default function TopBar() {

  const user = useSelector(
    (state: RootState) => state.auth.userDetails
  )

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setOpenLogoutDialog(true);
    // navigate("/login")
    // dispatch(logout());
    
  }
  const handleLogoutConfirmation = () => {
    setOpenLogoutDialog(false);
    dispatch(logout());
    navigate("/login");
  };

  return (
    <><AppBar color="transparent" variant="outlined" elevation={0}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 24px 8px 24px',
          fontFamily: 'Roboto,sans-serif',
          fontWeight: '600',
          color: '#1E88E5',
        }}
      >
        <div style={{ textAlign: 'center' }}>Ramp Up Project</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '4px',
            padding: '8px, 24px, 8px, 24px',
          }}
        >

          <div>
            {user ?
              <Button variant="outlined" size="small" onClick={handleLogout}>
                Logout
              </Button>
              :
              <Button variant="outlined" size="small" onClick={() => navigate("/login")}>
                Login
              </Button>}
          </div>
        </div>
      </div>
    </AppBar>
    <Modal
      open={openLogoutDialog}
      onClose={() => setOpenLogoutDialog(false)}
      aria-labelledby="logout-modal-title"
      aria-describedby="logout-modal-description"
    >
        <Paper
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '12PX',
          }}
        >
          <DialogBox
            message="Are you sure you want to logout?"
            primaryButton={{
              text: 'DISMISS',
              onClick: () => setOpenLogoutDialog(false),
            }}
            secondaryButton={{
              text: 'CONFIRM',
              onClick: handleLogoutConfirmation,
            }}
            primaryOption="DISMISS"
            secondaryOption="CONFIRM" />
        </Paper>
      </Modal></>
  )
}
