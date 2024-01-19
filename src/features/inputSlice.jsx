import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        courses : [],
        user:null,
  };
  const inputSlice = createSlice({
    name: 'CourseData',
    initialState,
    reducers: {
      setCourses: (state, action) => {
        state.courses= action.payload;
      } ,
      setUser:(state, action)=>{
        state.user = action.payload
      }
    },
  });
  
  export const {setCourses ,setUser} = inputSlice.actions;
  export default inputSlice.reducer;