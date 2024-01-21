import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Card, CardContent, Typography, Box, CircularProgress, Button, CardActionArea, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
    const courses = useSelector((state) => state.courses);
    const [search, setSearch] = useState('');
    const [filteredCourses, setFilteredCourses] = useState(courses);
    const navigate = useNavigate();

    useEffect(() => {
       
        const filtered = courses.filter((course) =>
            course.courseName.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCourses(filtered);
    }, [courses, search]);

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };



    const handleView = (id) => {
        navigate(`/courses/view/${id}`);
    };

    return (
        <div className='Courses'>
            <h1 style={{ marginBottom: '40px' }}>Available Courses</h1>
            <div style={{ marginBottom: '20px' }}>
                <input
                    style={{
                        padding: '10px',
                        marginRight: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        width: '20vw', 
                        fontSize: '16px',
                    }}
                    onChange={(e) => handleInputChange(e)}
                    placeholder='Search Courses'
                    value={search}
                />

            </div>
            {filteredCourses.length === 0 && (
                <div>
                    <p>No courses found.</p>
                </div>
            )}
            <Grid container spacing={2}>
                {filteredCourses.map((courseItem, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index} padding={'15px'} className='gridItem'>
                        <Card>
                            <CardActionArea>
                                <CardContent>
                                    <div style={{ width: '100%' }}>
                                        <Avatar sx={{ float: 'right' }} alt='' src={courseItem.thumbnail} />
                                        <Typography variant='h6' component='div'>
                                            {courseItem.courseName}
                                        </Typography>
                                    </div>
                                    <Typography color='textSecondary' gutterBottom>
                                        {courseItem.instructorName}
                                    </Typography>
                                    <Typography color='textSecondary' gutterBottom>
                                        <strong>Duration:</strong> {courseItem.courseDuration}
                                    </Typography>
                                </CardContent>
                                <Button
                                    variant='contained'
                                    sx={{ float: 'right', margin: '10px' }}
                                    onClick={() => handleView(courseItem.id)}
                                >
                                    View
                                </Button>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Courses;
