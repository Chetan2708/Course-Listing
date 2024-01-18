import {configureStore} from "@reduxjs/toolkit";
import inputReducer from "../features/inputSlice";

export const store = configureStore({
    reducer:inputReducer
})