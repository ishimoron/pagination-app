import {
	Box,
	Modal as MUIModal,
	Table as MUITable,
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { IColors } from '../../types/Colors'
import classes from './style.module.css'
interface IModalProps {
	setModal: (value: boolean) => void
	allColorsData: IColors[]
	modal: boolean
}

const Modal: React.FC<IModalProps> = ({ setModal, modal, allColorsData }) => {
	const handleClose = () => {
		setModal(false)
	}

	return (
		<MUIModal open={modal} onClose={handleClose}>
			<Box>
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
							{allColorsData && allColorsData.length > 0 ? (
								allColorsData.map(row => (
									<TableRow key={row.id} style={{ backgroundColor: row.color }}>
										<TableCell>{row.id}</TableCell>
										<TableCell>{row.name}</TableCell>
										<TableCell>{row.year}</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={3}>No data</TableCell>
								</TableRow>
							)}
						</TableBody>
					</MUITable>
				</TableContainer>
			</Box>
		</MUIModal>
	)
}

export default Modal
