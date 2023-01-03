import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Grid } from '@mui/material'
import PersonTableView from '../../Component/PersonTableView/PersonTableView'
import LogoutIcon from '@mui/icons-material/Logout'
import { unSetUser } from '../../slices/UserSlice'

const Home: React.FC = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const accessToken = useSelector((state: any) => state.user.accessToken)

  useEffect(() => {
    if (accessToken === null) {
      navigate('/')
    }
  }, [accessToken])

  return (
    <Grid
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '10px'
      }}
    >
      <Grid
        style={{
          width: '100%',
          height: '10vh',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: 'red',
            borderRadius: '5px',
            borderColor: 'gray',
            color: 'white',
            boxShadow: '1px 2px 2px 1px rgba(0, 0, 0, 0.16)'
          }}
          onClick={() => {
            dispatch(unSetUser())
            // navigate('/')
          }}
          endIcon={<LogoutIcon />}
        >
          LogOut
        </Button>
      </Grid>
      <div>
        {' '}
        <PersonTableView />{' '}
      </div>
    </Grid>
  )
}

export default Home
