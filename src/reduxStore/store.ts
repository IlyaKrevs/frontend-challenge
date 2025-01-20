import { configureStore } from "@reduxjs/toolkit";
import * as reducers from './slices/exports';

export const redux = configureStore({
    reducer: { ...reducers }
})





export type RootState = ReturnType<typeof redux.getState>
export type AppDispatch = typeof redux.dispatch