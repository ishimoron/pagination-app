import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { IconButton } from '@mui/material'
import classes from './style.module.css'

interface IPaginationProps {
	onPageChange: (value: number) => void
	totalPages: number
}

const Pagination: React.FC<IPaginationProps> = ({ onPageChange }) => {
	const searchParams = new URLSearchParams(location.search)
	const pageIdString = searchParams.get('page')
	const page = pageIdString ? parseInt(pageIdString, 10) : 1
	return (
		<div className={classes.pagination}>
			<IconButton
				onClick={() => onPageChange(page - 1)}
				disabled={page === 1}
				size='large'
			>
				<ArrowBackIosIcon />
			</IconButton>
			<span className={classes.page}>{page}</span>
			<IconButton
				onClick={() => onPageChange(page + 1)}
				disabled={page === 3}
				size='large'
			>
				<ArrowForwardIosIcon />
			</IconButton>
		</div>
	)
}

export default Pagination
