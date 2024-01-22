import React from 'react'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'

export default function TopBar() {
  return (
    <AppBar color="transparent" variant="outlined" elevation={0}>
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
            <Button variant="outlined" size="small">
              Login
            </Button>
          </div>
        </div>
      </div>
    </AppBar>
  )
}
