import {
	Table as MUITable,
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
	fetchAllColorsData,
	fetchColorsData,
	setPageID,
} from '../../store/reducers/colorsReducer'
import Modal from '../Modal'
import Pagination from '../Pagination'
import classes from './style.module.css'
import { IColors } from '../../types/Colors'

const Table = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useAppDispatch()
	const [modal, setModal] = useState<boolean>(false)
	const searchParams = new URLSearchParams(location.search)
	const pageIdString = searchParams.get('page')
	const pageId = pageIdString ? parseInt(pageIdString, 10) : 1
	const { data, total_pages, errorMessage, allColorsData } = useAppSelector(
		state => state.colors
	)

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchAllColorsData())
				await dispatch(fetchColorsData({ pageId }))

				dispatch(setPageID(pageId))
				navigate(`?page=${pageId}`)
			} catch (error: unknown) {
				if (error instanceof Error) {
					toast.error(`Error: ${error.message}`)
				} else {
					toast.error(`An unknown error occurred`)
				}
			}
		}

		fetchData()
	}, [])

	useEffect(() => {
		if (errorMessage) {
			toast.error(`Error: ${errorMessage}`)
		}
	}, [errorMessage])

	const toggleModal = () => {
		setModal(prev => !prev)
	}

	const handlePageChange = async (newPage: number) => {
		await dispatch(fetchColorsData({ pageId: newPage }))
		navigate(`?page=${newPage}`)
	}

	return (
		<div className={classes.table}>
			<TableContainer component={Paper}>
				<MUITable>
					<TableHead>
						<TableRow>
							<TableCell className={classes.tableHeadCell}>Id</TableCell>
							<TableCell className={classes.tableHeadCell}>Name</TableCell>
							<TableCell className={classes.tableHeadCell}>Year</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data ? (
							Array.isArray(data) ? (
								data.map(row => (
									<TableRow
										key={row.id}
										style={{ backgroundColor: row.color, cursor: 'pointer' }}
										onClick={toggleModal}
									>
										<TableCell>{row.id}</TableCell>
										<TableCell>{row.name}</TableCell>
										<TableCell>{row.year}</TableCell>
									</TableRow>
								))
							) : (
								<TableRow
									style={{
										backgroundColor: (data as IColors).color,
										cursor: 'pointer',
									}}
									onClick={toggleModal}
								>
									<TableCell>{(data as IColors).id}</TableCell>
									<TableCell>{(data as IColors).name}</TableCell>
									<TableCell>{(data as IColors).year}</TableCell>
								</TableRow>
							)
						) : (
							<TableRow>
								<TableCell colSpan={3}>No data</TableCell>
							</TableRow>
						)}
					</TableBody>
				</MUITable>
			</TableContainer>

			<Pagination onPageChange={handlePageChange} totalPages={total_pages} />
			{modal && (
				<Modal
					modal={modal}
					setModal={setModal}
					allColorsData={allColorsData}
				/>
			)}
		</div>
	)
}

export default Table
