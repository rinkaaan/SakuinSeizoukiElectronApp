import { configureStore } from "@reduxjs/toolkit"
import { mainReducer } from "../routes/mainSlice"
import { newProjectReducer } from "../routes/projects/new-project/newProjectSlice"

const store = configureStore({
  reducer: {
    main: mainReducer,
    newProject: newProjectReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export type RootState = ReturnType<typeof store.getState>;
export default store
export const appDispatch = store.dispatch
