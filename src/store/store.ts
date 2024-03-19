import { combineReducers, configureStore } from '@reduxjs/toolkit'
import colorsReducer from './reducers/colorsReducer'

const rootReducer = combineReducers({
	colors: colorsReducer,
})

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
