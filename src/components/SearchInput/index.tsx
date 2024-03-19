import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchColorsData, setPageID } from '../../store/reducers/colorsReducer'
import classes from './style.module.css'

const SearchInput = () => {
	const [id, setId] = useState<number>(0)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { page: pageId } = useAppSelector(state => state.colors)
	const changeId = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value, 10)
		if (!isNaN(value)) {
			setId(value)
		}
	}

	useEffect(() => {
		const fetchColorsById = async () => {
			try {
				await dispatch(fetchColorsData({ pageId, id }))
				dispatch(setPageID(pageId))
				if (typeof pageId !== 'undefined') {
					if (id !== 0) {
						navigate(`?page=${pageId}&id=${id}`)
					} else {
						navigate(`?page=${pageId}`)
					}
				}
			} catch (error: unknown) {
				if (error instanceof Error) {
					toast.error(`Error: ${error.message}`)
				} else {
					toast.error(`An unknown error occurred`)
				}
			}
		}
		fetchColorsById()
	}, [id])

	return (
		<div className={classes.search}>
			<TextField
				label='Filter by id'
				type='number'
				className={classes.searchInput}
				fullWidth
				InputProps={{
					classes: {
						input: classes.searchInput,
					},
				}}
				onChange={changeId}
			/>
		</div>
	)
}

export default SearchInput
