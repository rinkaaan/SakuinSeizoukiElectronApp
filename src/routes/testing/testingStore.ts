import { configureStore } from "@reduxjs/toolkit"
import { testingReducer } from "./testingSlice"

const store = configureStore({
  reducer: {
    testing: testingReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export type TestingRootState = ReturnType<typeof store.getState>;
export default store
export const testingDispatch = store.dispatch
