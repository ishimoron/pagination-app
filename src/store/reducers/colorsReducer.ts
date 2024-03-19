import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { IColors, IData } from '../../types/Colors'

const initialState: IData = {
	page: 1,
	per_page: 5,
	total: 0,
	total_pages: 0,
	data: [] as IColors[],
	allColorsData: [] as IColors[],
	errorMessage: undefined,
}

const baseURL = `https://reqres.in/api/products`

export const setPageID = createAction<number>('colors/setPageID')

export const fetchColorsData = createAsyncThunk(
	'colors/fetchColorsData',
	async ({ pageId, id }: { pageId?: number; id?: number }) => {
		const actualPageId = pageId || 1
		const url = id
			? `${baseURL}?page=${actualPageId}&per_page=${initialState.per_page}&id=${id}`
			: `${baseURL}?page=${actualPageId}&per_page=${initialState.per_page}`
		const response = await axios.get(url)
		return response.data
	}
)

export const fetchAllColorsData = createAsyncThunk(
	'colors/fetchAllColorsData',
	async () => {
		const response = await axios.get(`${baseURL}?per_page=12`)
		return response.data
	}
)

const colorsSlice = createSlice({
	name: 'colors',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchColorsData.fulfilled, (state, action) => {
			state.data = action.payload.data
			state.page = action.payload.page
			state.per_page = action.payload.per_page
			state.total = action.payload.total
			state.total_pages = action.payload.total_pages
			state.errorMessage = undefined
		})
		builder.addCase(fetchColorsData.rejected, (state, action) => {
			state.errorMessage = action.error.message
		})

		builder.addCase(fetchAllColorsData.fulfilled, (state, action) => {
			state.allColorsData = action.payload.data
			state.page = action.payload.page
			state.errorMessage = undefined
		})
		builder.addCase(fetchAllColorsData.rejected, (state, action) => {
			state.errorMessage = action.error.message
		})

		builder.addCase(setPageID, (state, action) => {
			state.page = action.payload
		})
	},
})

export default colorsSlice.reducer
