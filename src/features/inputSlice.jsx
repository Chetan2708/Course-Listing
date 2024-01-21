import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  user: null,
  alert: {
    open: false,
    message: "",
    type: "",
  },
  enrolled:[],
};
const inputSlice = createSlice({
  name: 'CourseData',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setAlert: (state, action) => {
      state.alert = action.payload
    },
    setEnrolled: (state, action) => {
      state.enrolled = action.payload
    },
    resetEnrolled: (state) => {
      state.enrolled = [];
    },
   
    markCourseAsCompleted: (state, action) => {
      const courseId = action.payload;
      const courseIndex = state.courses.findIndex(course => course.id === courseId);
      
      if (courseIndex !== -1) {
        state.courses[courseIndex].completed = 'Completed';
      }
    },
  },
});

export const { setCourses, setUser , setAlert , setEnrolled , resetEnrolled  ,markCourseAsCompleted} = inputSlice.actions;
export default inputSlice.reducer;