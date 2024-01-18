import { Box, CircularProgress, Container } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TimerIcon from '@mui/icons-material/Timer';
const CourseViewPage = () => {
    const {id} = useParams()
    const courses = useSelector((state)=>state.courses)
    const selectedCourse = courses.find((course) => course.id === parseInt(id, 10));

    if (!selectedCourse) {
      return (<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <CircularProgress />
  </Box>)
    }
  return (
    <div className='courseView'>
      <div className="courseViewcontainer">
        <h2>{selectedCourse.courseName}</h2>
        <p id='desc'>{selectedCourse.description}</p>
        <p id='ins_Name'>Instructor : {selectedCourse.instructorName}</p>
        <p id='duration'><TimerIcon/> Duration : {selectedCourse.courseDuration}</p>
        <p id="location"><LocationOnIcon/> Location : {selectedCourse.location}</p>
      </div>
    </div>
  )
}

export default CourseViewPage