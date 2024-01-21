import React from 'react';
import EnrolledCourseCard from '../components/EnrolledCourseCard';
import { useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';

const StudentDashboard = () => {
  const enrolled = useSelector((state) => state.enrolled);
  const courses = useSelector((state) => state.courses);
  const userData = useSelector((state) => state.user);
  
  return (
    <div>
      {userData ? (
        <>
          <div className='enrolledCoursesHeader'>
            My enrolled courses
          </div>

          <div className='enrolledAllCourses'>
            {enrolled.length === 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: '30px' }}>
                <Typography variant="h6" align="center" color="textSecondary">
                  Enroll into a course to see your courses.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {enrolled.map(({ id }) => {
                  const course = courses.find((c) => c.id === id);
                  if (!course) {
                    return null; 
                  }
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={course.id} sx={{ height: '100%' }}>
                      <EnrolledCourseCard course={course} enrolled={enrolled} />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </div>
        </>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '30px' }}>
          <Typography variant="h5" align="center" color="textSecondary">
            Please login to view your dashboard.
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default StudentDashboard;
  