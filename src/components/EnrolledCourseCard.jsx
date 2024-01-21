import React from 'react';
import { Card, CardContent, Typography, Button, CardActionArea, Avatar, Slider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EnrolledCourseCard = ({ course, enrolled }) => {
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/courses/view/${course.id}`);
    };

    
    const enrolledCourse = enrolled.find(item => item.id === course.id);

    return (
        <Card sx={{ mb: '20px' }}>
            <CardContent>
                <div style={{ width: '100%' }}>
                    <Avatar sx={{ float: 'right' }} alt="" src={course.thumbnail} />
                    <Typography variant="h6" component="div">
                        {course.courseName}
                    </Typography>
                </div> 
                <Typography color="textSecondary" gutterBottom>
                    {course.instructorName}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    <strong>Duration:</strong> {course.courseDuration}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    <strong>Status:</strong> {enrolledCourse ? enrolledCourse.status : 'Not Enrolled'}
                </Typography>
                {course.progressBar && (
                    <div>
                        <Typography gutterBottom>
                            <strong>Progress:</strong> {course.progressBar}%
                        </Typography>
                        <Slider
                            value={course.progressBar}
                            aria-label="Progress"
                            sx={{
                                color: 'green',
                                '& .MuiSlider-track': {
                                    backgroundColor: 'green',
                                },
                                '& .MuiSlider-thumb': {
                                    display: 'none', 
                                },
                            }}
                        />
                    </div>
                )}
            </CardContent>

            <Button variant="contained" sx={{ float: 'right', margin: '10px' }} onClick={handleView}>
                View
            </Button>
        </Card>
    );
};

export default EnrolledCourseCard;
