import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';

const ProfileBox = ({ onClose }) => {
    const user = useSelector((state) => state.user);

    return (
        <Modal
            open={true} // You can control the visibility of the modal using a state
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    bgcolor: 'white',
                    borderRadius: 8,
                    boxShadow: 24,
                    p: 4,
                    textAlign: 'center',
                }}
            >
                <Avatar
                    alt="User Avatar"
                    src={user.photoURL}
                    sx={{ width: 80, height: 80, marginBottom: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                    {user.displayName}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" paragraph>
                    {user.email}
                </Typography>
                <Button variant="contained" color="primary" onClick={onClose}>
                    Close
                </Button>
            </Box>
        </Modal>
    );
};

export default ProfileBox;

