import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        courses : [],

  };
  const inputSlice = createSlice({
    name: 'CourseData',
    initialState,
    reducers: {
      setCourses: (state, action) => {
        state.courses= action.payload;
      } 
    },
  });
  
  export const {setCourses} = inputSlice.actions;
  export default inputSlice.reducer;