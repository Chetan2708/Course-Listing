import { Box, Button, TextField } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../../firbase';
import { setAlert } from '../../features/inputSlice';
import { useDispatch } from 'react-redux';

const Login = ({ handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()

    const handleSubmit = async () => {
        if (!password ||!email) {
        dispatch(  setAlert({
            open: true,
            message: "Please fill all the Fields",
            type: "error",
          }))
          return;
        }
          try {
            const result = await signInWithEmailAndPassword(auth , email , password)
           
           dispatch( setAlert({
              open: true,
              message: `Sign Up Successful. Welcome ${result.user.email}`,
              type: "success",
            }))
      
            handleClose();
          } catch (error) {
           dispatch( setAlert({
              open: true,
              message: error.message,
              type: "error",
            }))
            return;
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
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            style={{ backgroundColor: "#EEBC1D" }}
          >
            Login
          </Button>
        </Box>
      );
}

export default Login