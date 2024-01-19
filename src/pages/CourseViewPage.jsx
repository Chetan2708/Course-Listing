import { Box, Button, CircularProgress, Divider } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp'; import TimerIcon from '@mui/icons-material/Timer';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
const CourseViewPage = () => {
  const { id } = useParams()
  const courses = useSelector((state) => state.courses)
  const selectedCourse = courses.find((course) => course.id === parseInt(id, 10));

  if (!selectedCourse) {
    return (<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CircularProgress />
    </Box>)
  }
  return (
    <>
      <div className='courseView'>
        <div className="courseViewcontainer">
          <h2>{selectedCourse.courseName}</h2>
          <div className="content">
            <p id='desc'><em>
              {selectedCourse.description}
            </em>
            </p>
            <p id='ins_Name'>Instructor : {selectedCourse.instructorName}</p>
            <p id='duration'><TimerIcon /> Duration : {selectedCourse.courseDuration}</p>
            <p id="location"><LocationOnSharpIcon /> Location : {selectedCourse.location}</p>
            <p id="schedule"><CalendarMonthIcon /> Schedule : {selectedCourse.schedule}</p>
            <p id="prerequisites"> Prerequisites: {selectedCourse.prerequisites.length > 1 ? selectedCourse.prerequisites.join(', ') : selectedCourse.prerequisites}</p>
          </div>
        </div>
        <div className='thumbnail'>
          <img src={selectedCourse.thumbnail} alt="Course Image" />
          <p id="enrollmentstatus">Enrollment Status: {selectedCourse.enrollmentStatus}</p>
          {selectedCourse.enrollmentStatus === "Open" || selectedCourse.enrollmentStatus === "In Progress" ? (
            <Button>Enroll Now</Button>
          ) : (
            <p>You can enroll only in Open courses or In progress courses.</p>
          )}
        </div>
      </div>
      <h2 style={{ textAlign: 'center', margin: '20px' }}>{selectedCourse.courseName} - Syllabus</h2>
      <div className="syllabus">
        {selectedCourse.syllabus.map((weekData) => (
          <Accordion key={weekData.week}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="h6">
                Week {weekData.week} :- {weekData.topic}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <ul className="weektopics">
                  {weekData.subtopics.map((subtopic, index) => (
                    <>
                      <li key={subtopic} style={{ marginBottom: '8px' }}>
                        <OndemandVideoIcon className="videoIcon" />{subtopic}</li>
                      {index !== weekData.subtopics.length - 1 && <Divider style={{ marginBottom: '16px' }} />}
                    </>
                  ))}

                </ul>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  )
}

export default CourseViewPage