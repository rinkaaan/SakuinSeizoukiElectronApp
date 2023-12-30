import { combineReducers } from "@reduxjs/toolkit"
import { mainReducer } from "../routes/mainSlice"
import { newProjectReducer } from "../routes/create-index/newProjectSlice"

export const reducers = combineReducers({
  main: mainReducer,
  newProject: newProjectReducer,
})

export type RootState = ReturnType<typeof reducers>
