import * as React from 'react'
import { useState } from 'react'
import { Button, Grid, Tab, Tabs } from '@mui/material'
import bg from './landPage.jpg'
import SignIn from '../../Component/SignIn/SignIn'
import SignUp from '../../Component/SignUp/SignUp'

const LandPage = () => {
  const [tabVal, setTabVal] = useState('signin')

  return (
    <Grid
      container
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover'
      }}
    >
      <Grid
        item
        xs={9}
        sm={8}
        md={6}
        lg={5}
        xl={4}
        style={{
          backgroundColor: 'white',
          minHeight: '370px',
          borderRadius: '15px',
          boxShadow: '1px 1px 5px 2px rgba(0, 0, 0, 0.16)',
          padding: '25px 15px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Tabs
            value={tabVal}
            onChange={(event: React.SyntheticEvent, newValue: string) => {
              setTabVal(newValue)
            }}
          >
            <Tab value="signin" label="Sign In" />
            <Tab value="signup" label="Sign Up" />
          </Tabs>
          {tabVal === 'signin' ? <SignIn /> : <SignUp />}
          <Button
            size="small"
            onClick={() => {
              if (tabVal === 'signin') {
                setTabVal('signup')
              } else {
                setTabVal('signin')
              }
            }}
          >
            {tabVal === 'signin'
              ? <u>Create New Account</u>
              : <u>Already have an Account ?</u>}
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default LandPage
