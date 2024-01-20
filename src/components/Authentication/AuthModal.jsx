import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AppBar, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setAlert } from '../../features/inputSlice';
import { useDispatch } from 'react-redux';
import { auth } from '../../firbase';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  backgroundColor: 'background.paper',
  color: "white",
  borderRadius: 10,
  boxShadow: 24,
  p:4
};

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const googleProvider = new GoogleAuthProvider();


  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        dispatch(setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        }))

        handleClose();
      })
      .catch((error) => {
        dispatch(setAlert({
          open: true,
          message: error.message,
          type: "error",
        }))
        return;
      });
  };
  return (
    <div>
      <Button sx={{color :"black"}} onClick={handleOpen}  variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#c0ba4a"}}> Login </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Login"  />
          <Tab label="Signup"  />
        </Tabs>
      </Box>
            {value===0 && <Login handleClose={handleClose}/>}
            {value===1 && <Signup handleClose={handleClose}/>}
            <Box className='google'>
              <span style={{marginBottom:'5px'}}>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}