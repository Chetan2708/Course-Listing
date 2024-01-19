import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Card, CardContent, Typography, Box, CircularProgress, Button, CardActionArea } from '@mui/material';

import { useNavigate } from 'react-router-dom';
const Courses = () => {
    const courses = useSelector((state) => state.courses);
    
    const navigate = useNavigate()

    if (courses.length === 0) {
        return (
            <div className='Courses'>
                <h1>Available Courses</h1>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <CircularProgress />
                </Box>
            </div>
        );
    }

    const handleView = (id) => {
        
        navigate(`/courses/view/${id}`);
      };
    return (
        <div className='Courses'>
            <h1 style={{marginBottom:'40px'}}> Available Courses</h1>
            <Grid container spacing={2}>
                {courses.map((courseItem, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index} padding={'15px'} className='gridItem'>
                        <Card>
                        <CardActionArea >
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {courseItem.courseName}
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    {courseItem.instructorName}
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                <strong>Duration:</strong> {courseItem.courseDuration}
                                </Typography>
                            
                            </CardContent >
                                <Button variant='contained' sx={{float:'right' ,margin:'10px'}} onClick={()=>handleView(courseItem.id)}>
                                    View
                                    </Button>
                </CardActionArea >
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
        );
    };
    
    export default Courses;
