import React from 'react'
import { Button } from '@mui/material'
import styled from 'styled-components'
import { useAppDispatch } from '../../redux/hooks'
import { login } from '../../redux/user/slice'
const AppbarWrapper = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    z-index: 1;
    background-color: white;
    flex-direction: raw;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e0e0e0;
`

const AppbarTitle = styled.div`
    display: flex;
    flex-direction: raw;
    font-size: 24px;
    font-style: normal;
    padding: 5px 0 5px 15px;
    font-weight: 700;
    color: rgba(30, 136, 229, 1);
`

const ButtonWrapper = styled.div`
    padding: 5px 15px 5px 0;
    display: flex;
    flex-direction: raw;
`


const Appbar = () => {
    const dispatch = useAppDispatch();
    const handleLogin = () => {
        dispatch(login({user:"test"}))
        console.log("clicked")
    }
    return (
        <AppbarWrapper>
            <AppbarTitle>Ramp up Project</AppbarTitle>
            <ButtonWrapper>
                <Button variant="outlined" onClick={handleLogin}>Login</Button>
            </ButtonWrapper>
        </AppbarWrapper>
    )
}

export default Appbar
