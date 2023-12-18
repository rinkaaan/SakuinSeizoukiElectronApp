import { configureStore } from "@reduxjs/toolkit"
import { commonReducer } from "../slices/commonSlice"
import { newProjectReducer } from "../slices/newProjectSlice"

const store = configureStore({
  reducer: {
    common: commonReducer,
    newProject: newProjectReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export default store
export const appDispatch = store.dispatch
