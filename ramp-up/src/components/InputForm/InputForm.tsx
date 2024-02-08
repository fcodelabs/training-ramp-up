import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import DialogBox from '../DialogBox/DialogBox'


interface ModalProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

function InputForm({ openModal, setOpenModal }: ModalProps) {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [nameError, setNameError] = useState('')
  const [roleError, setRoleError] = useState('')
  const [openSuccessModal, setOpenSuccessModal] = useState(false) // New state for success modal


  const FormData = {
    name,
    email,
    role,
  }

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setEmail(value)
    validateEmail(value)
  }

  const handleClose = () => {
    setOpenModal(false)
    // Clear form fields and errors on modal close
    setName('')
    setEmail('')
    setRole('')
    setNameError('')
    setEmailError('')
  }

  const handleSubmit = () => {
    let isValid = true
    if (!name) {
      setNameError('Name is required')
      isValid = false
    }
    if (!email) {
      setEmailError('Email is required')
      isValid = false
    }
    if (!role) {
      setRoleError('Role is required')
      isValid = false
    }

    if (isValid) {
      console.log(FormData)
      axios.post('http://localhost:4000/api/users/', FormData)
      .then(({data})=>{
          setOpenModal(false)
          setOpenSuccessModal(true) // Open success modal on successful submission
          console.log("success",data)
      })
      .catch((err) => {
          console.log(err)
      })
    }
  }

  return (
    <>
    <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <DialogTitle>Add a New User</DialogTitle>
      <DialogContent>
        <div style={{ marginBottom: '20px' }}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            style={{ width: '500px' }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!nameError}
            helperText={nameError}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            style={{ width: '500px' }}
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
          />
        </div>
        <div style={{ width: '500px' }}>
          <FormControl variant="outlined" fullWidth error={!!roleError}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value as string)}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Observer">Observer</MenuItem>
            </Select>
          </FormControl>{' '}
        </div>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'flex-start' }}>
        <Button
          type="submit"
          variant="contained"
          style={{ marginLeft: '15px' }}
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
        <Button onClick={handleClose} variant="outlined">
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
    <Modal
        open={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <Paper
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '12px',
          }}
        >
              <DialogBox
            message="A password creation link has been sent to the provided email address."
            primaryButton={{
              text: 'OK',
              onClick: () => setOpenSuccessModal(false),
            }}
            primaryOption="OK"
          />
        </Paper>
      </Modal>
    </>

  )
}
export default InputForm
