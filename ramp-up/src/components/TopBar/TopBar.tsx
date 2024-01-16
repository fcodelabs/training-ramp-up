import React from 'react'
import Button from '@mui/material/Button'

export default function TopBar() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px, 24px, 8px, 24px',
        fontFamily: 'Roboto,sans-serif',
        fontWeight: '600',
        color: '#1E88E5',
      }}
    >
      Ramp Up Project
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
  )
}
