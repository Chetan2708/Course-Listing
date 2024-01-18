import './App.css'
import '@fontsource/roboto/700.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Courses from './pages/Courses';
import StudentDashboard from './pages/StudentDashboard';
function App() {


  return (
    <>
        <Router>
      <Header />
      <Routes>
        <Route path="/courses" element={<Courses/>} />
        <Route path="/dashboard" element={<StudentDashboard/>} />

      </Routes>
      
    </Router>
    </>
  );
}

export default App;
