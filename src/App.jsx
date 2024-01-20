import './App.css'
import '@fontsource/roboto/700.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Courses from './pages/Courses';
import StudentDashboard from './pages/StudentDashboard';
import CourseViewPage from './pages/CourseViewPage';
import Alertt from './misc/Alert';
function App() {


  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/view/:id" element={<CourseViewPage />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
        </Routes>
      <Alertt/>
      </Router>
    </>
  );
}

export default App;
