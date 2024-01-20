import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  user: null,
  alert: {
    open: false,
    message: "",
    type: "",
  },
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
    }
  },
});

export const { setCourses, setUser , setAlert } = inputSlice.actions;
export default inputSlice.reducer;