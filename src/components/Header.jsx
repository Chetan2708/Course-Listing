import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/img.jpg'
const pages = ['Courses'];
const settings = ['Profile', 'Dashboard', 'Logout'];
import { setCourses, setUser } from '../features/inputSlice';
import { get, ref } from 'firebase/database';
import { auth, dbRealtime } from '../firbase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';  
import ProfileBox from '../misc/ProfileBox'
import { useState } from 'react';
import AuthModal from './Authentication/AuthModal';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const userData = useSelector((state) => state.user)
 
    const navigate = useNavigate()
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);

    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleClick = (page) => {
        if (page === 'Courses') {
            navigate('/courses');
            handleCloseNavMenu();
        } else {
            handleCloseNavMenu();
        }
    };
    const handleSettings = (setting) => {
        if (setting === 'Profile') {
            setIsProfileModalOpen(true);
            handleCloseUserMenu()
        }
        else if (setting === 'Dashboard') {

            navigate("/dashboard");
            handleCloseUserMenu()
        }
        else {
            console.log('logout')
            handleCloseUserMenu()
        }
    }
    const handleCloseProfileModal = () => {
        setIsProfileModalOpen(false);
    };
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesRef = ref(dbRealtime, 'courses');
                const snapshot = await get(coursesRef);
                const coursesData = snapshot.val();


                if (Array.isArray(coursesData)) {
                    dispatch(setCourses(coursesData));
                } else {
                    console.error('Invalid courses data:', coursesData);
                    dispatch(setCourses([]));
                }
            } catch (error) {
                console.error('Error fetching data from Firebase:', error);
                dispatch(setCourses([]));
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(setUser(user))
            }
            else{
                dispatch(setUser(null))
            }
    }) 
    }, [])
    const handleLogout =()=>{
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth)
              Swal.fire({
                title: "Logged Out!",
                text: "You are logged out!",
                icon: "success"
              });
            }
          });
    }
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters >

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"

                        sx={{

                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img
                            src={logoImage}
                            alt="Logo"
                            style={{ width: '80px', height: '80px', borderRadius: '50%', margin: '10px' }}
                        />

                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => handleClick(page)}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img
                            src={logoImage}
                            alt="Logo"
                            style={{ width: '80px', height: '80px', borderRadius: '50%', margin: '20px' }}
                        />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => handleClick(page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {userData?<Box sx={{ display: 'flex' }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="" src= {userData? userData.photoURL : "/static/images/avatar/2.jpg"}  />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleSettings(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                        <div className='LoginHandler'>
                        <Button sx={{color:'black' , backgroundColor: "#EEBC1D"}} onClick={handleLogout}>Logout</Button> 
                        </div>
                    </Box> : <AuthModal />}
                </Toolbar>
            </Container>
            {isProfileModalOpen && (
                <ProfileBox onClose={handleCloseProfileModal} />
            )}
        </AppBar>
    );
}
export default ResponsiveAppBar;