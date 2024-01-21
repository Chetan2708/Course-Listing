import { Box, Button, Checkbox, CircularProgress, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import TimerIcon from '@mui/icons-material/Timer';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import Confetti from 'react-confetti';

import { markCourseAsCompleted, setAlert } from '../features/inputSlice';
import Swal from 'sweetalert2';
import { db } from '../firbase';

const CourseViewPage = () => {
  const { id } = useParams();
  const courses = useSelector((state) => state.courses);
  const userData = useSelector((state) => state.user);
  const enrolled = useSelector((state) => state.enrolled);
  const [completedSubtopics, setCompletedSubtopics] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);

  const selectedCourse = courses.find((course) => course.id === parseInt(id, 10));
  const dispatch = useDispatch();

  if (!selectedCourse) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const inEnrolledList = enrolled.find((course) => course.id === selectedCourse?.id);
  console.log(inEnrolledList)  
  const enrollHandler = async () => {
    const courseRef = doc(db, 'enrolled', userData.uid);
    try {
      const updatedCourses = enrolled
        ? [...enrolled, { id: selectedCourse?.id, status: 'Incomplete' }]
        : [{ id: selectedCourse?.id, status: 'Incomplete' }];

      await setDoc(courseRef, { courses: updatedCourses });

      dispatch(
        setAlert({
          open: true,
          message: `You are enrolled into ${selectedCourse.courseName}`,
          type: 'success',
        })
      );
    } catch (error) {
      dispatch(
        setAlert({
          open: true,
          message: error.message,
          type: 'error',
        })
      );
    }
  };

  const removeCourseHandler = async () => {
    const courseRef = doc(db, 'enrolled', userData.uid);
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to unenroll from the course ',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Find the enrolled course object with matching ID
          const enrolledCourse = enrolled.find((course) => course.id === selectedCourse?.id);

          if (enrolledCourse) {
            
            const updatedCourses = enrolled.filter((course) => course.id !== selectedCourse?.id);

            
            await setDoc(courseRef, {
              courses: updatedCourses,
            });

            Swal.fire({
              title: 'Unsubscribed',
              text: `You unsubscribed from the course ${selectedCourse.courseName}`,
              icon: 'success',
            });
          } else {
            console.error('Enrolled course not found:', selectedCourse?.id);
          }
        }
      });
    } catch (error) {
      dispatch(
        setAlert({
          open: true,
          message: error.message,
          type: 'error',
        })
      );
    }
  };

  const handleCheckboxChange = (week, subtopic) => {
    const key = `${week}-${subtopic}`;
    setCompletedSubtopics((prevCompleted) => ({
      ...prevCompleted,
      [key]: !prevCompleted[key],
    }));
  };

  const HandleMarkAsComplete = async () => {
    const courseRef = doc(db, 'enrolled', userData.uid);

    try {
      const updatedCourses = enrolled.map((course) =>
        course.id === selectedCourse?.id ? { ...course, status: 'Completed' } : course
      );

      await setDoc(courseRef, { courses: updatedCourses });

      Swal.fire({
        title: "Completed!",
        text: `You completed course ${selectedCourse.courseName}.`,
        icon: "success"
      });

      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000); 
    } catch (error) {
      dispatch(
        setAlert({
          open: true,
          message: error.message,
          type: 'error',
        })
      );
    }
  };

  return (
    <>
      {showConfetti && <Confetti />} {/* Show confetti when showConfetti is true */}
      <div className="courseView">
        <div className="courseViewcontainer">
          <h2>{selectedCourse.courseName}</h2>
          <div className="content">
            <p id="desc">
              <em>{selectedCourse.description}</em>
            </p>
            <p id="ins_Name">Instructor : {selectedCourse.instructorName}</p>
            <p id="duration">
              <TimerIcon /> Duration : {selectedCourse.courseDuration}
            </p>
            <p id="location">
              <LocationOnSharpIcon /> Location : {selectedCourse.location}
            </p>
            <p id="schedule">
              <CalendarMonthIcon /> Schedule : {selectedCourse.schedule}
            </p>
            <p id="prerequisites">
              {' '}
              Prerequisites: {selectedCourse.prerequisites.length > 1
              ? selectedCourse.prerequisites.join(', ')
              : selectedCourse.prerequisites}
            </p>
          </div>
        </div>
        <div className="thumbnail">
          <img src={selectedCourse.thumbnail} alt="Course Image" />
          <h3 style={{ marginBottom: '10px' }} id="enrollmentstatus">
            Enrollment Status: {selectedCourse.enrollmentStatus}
          </h3>
          {userData && (
            selectedCourse.enrollmentStatus === 'Open' ||
            selectedCourse.enrollmentStatus === 'In Progress' ? (
              <>
                <Button onClick={inEnrolledList ? removeCourseHandler : enrollHandler}>
                  {inEnrolledList ? 'Remove the course' : 'Enroll Now'}
                </Button>
                {inEnrolledList && inEnrolledList.status==='Incomplete'&& (
                  <Button onClick={HandleMarkAsComplete}>
                    Mark as complete
                  </Button>
                )}
              </>
            ) : (
              <p>You can enroll only in Open courses or In progress courses.</p>
            )
          )}
        </div>
      </div>
      <h2 style={{ textAlign: 'center', margin: '20px' }}>{selectedCourse.courseName} - Syllabus</h2>
      <div className="syllabus">
        {selectedCourse.syllabus.map((weekData) => (
          <Accordion key={weekData.week}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                Week {weekData.week} :- {weekData.topic}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <ul className="weektopics">
                  {weekData.subtopics.map((subtopic, index) => (
                    <div key={subtopic}>
                      <li style={{ marginBottom: '8px' }}>
                        {inEnrolledList && (
                          <Checkbox
                            checked={completedSubtopics[`${weekData.week}-${subtopic}`] || false}
                            onChange={() => handleCheckboxChange(weekData.week, subtopic)}
                          />
                        )}
                        <OndemandVideoIcon className="videoIcon" />
                        {subtopic}
                      </li>
                      {index !== weekData.subtopics.length - 1 && <Divider style={{ marginBottom: '16px' }} />}
                    </div>
                  ))}
                </ul>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default CourseViewPage;
