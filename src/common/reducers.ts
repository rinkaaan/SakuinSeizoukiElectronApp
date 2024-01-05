import { combineReducers } from "@reduxjs/toolkit"
import { mainReducer } from "../routes/mainSlice"
import { createIndexReducer } from "../routes/create-index/createIndexSlice"

export const reducers = combineReducers({
  main: mainReducer,
  createIndex: createIndexReducer,
})

export type RootState = ReturnType<typeof reducers>
