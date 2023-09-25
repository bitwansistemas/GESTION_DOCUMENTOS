import {configureStore} from "@reduxjs/toolkit"
import documentoReducer from "./documentoSlice"

export const store =configureStore({
    reducer:{
        documento:documentoReducer,
      
    }
})