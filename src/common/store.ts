import { configureStore } from "@reduxjs/toolkit"
import { commonReducer } from "../slices/commonSlice"

const store = configureStore({
  reducer: {
    common: commonReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export default store
export const appDispatch = store.dispatch
