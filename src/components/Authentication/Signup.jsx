import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { auth } from '../../firbase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setAlert } from '../../features/inputSlice';
import { useDispatch } from 'react-redux';


const Signup = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch()
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      dispatch(setAlert({
        open: true,
        message: "Password didn't match",
        type: 'error'
      }))
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      dispatch(setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      }))

      handleClose();
    } catch (error) {
      dispatch(setAlert({
        open: true,
        message: error.message,
        type: "error",
      }))
      return
    }
  }
  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup