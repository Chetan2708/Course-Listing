import { Box, Button, TextField } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../../firbase';

const Login = ({ handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async () => {
        if (!password ||!email) {
            console.log('error')
          return;
        }
          try {
            const result = await signInWithEmailAndPassword(auth , email , password)
           
            handleClose()
          } catch (error) {
                console.log(error)
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