import type {Action, ThunkAction} from "@reduxjs/toolkit"
import {combineSlices, configureStore} from "@reduxjs/toolkit"
import clientSlice from "../features/slices/clientSlice.ts";

const rootReducer = combineSlices(clientSlice)
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    })
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>
