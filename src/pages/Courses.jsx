import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, CardContent, Typography, Box, CircularProgress, Button } from '@mui/material';
import { setCourses } from '../features/inputSlice';
import { get, ref } from 'firebase/database';
import { dbRealtime } from '../firbase';

const Courses = () => {
    const courses = useSelector((state) => state.courses);
    console.log('Courses:', courses);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesRef = ref(dbRealtime, 'courses');
                const snapshot = await get(coursesRef);
                const coursesData = snapshot.val();
                console.log('Courses Data:', coursesData);

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
    }, [dispatch]);

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
    return (
        <div className='Courses'>
            <h1>Available Courses</h1>
            <Grid container spacing={2}>
                {courses.map((courseItem, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index} padding={'15px'} className='gridItem'>
                        <Card>
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
                                <Button variant='contained' sx={{float:'right' ,margin:'10px'}}>View</Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Courses;
