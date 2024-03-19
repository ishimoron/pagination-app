import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import classes from './App.module.css'
import Table from './components/SearchInput/index'
import SearchInput from './components/Table/index'
const App = () => {
	return (
		<div className={classes.main}>
			<div className={classes.container}>
				<SearchInput />
				<Table />
				<ToastContainer
					position='top-center'
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable={false}
					pauseOnHover={false}
					theme='colored'
				/>
			</div>
		</div>
	)
}

export default App
