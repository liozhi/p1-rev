import Registration from './components/Registration';
import Login from './components/Login';
import Users from './components/Users';

import { Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css'; // required for bootstrap to work
import { useEffect, useState } from 'react';
import { store } from './store';
import Reimbursements from './components/Reimbursements';

// import './App.css';
import './index.css';
import NavBar from './components/NavBar';
import ReimbursementsAdmin from './components/ReimbursementsAdmin';
import { Toast } from 'react-bootstrap';

interface ToastMsg {
	active: boolean,
	message: string
}

const App = () => {

	const [updateState, setUpdateState] = useState<number>(0); // forcing state updates, thanks react

	const [toast, setToast] = useState<ToastMsg>({active: false, message: "aeiou"});
	
	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("reimbUser")!);
		if (userData === null || userData === undefined) store.loggedInUser = { userId: 0, username: "", role: "", firstName: "", lastName: ""};
		if (userData != "") store.loggedInUser = userData;
		setUpdateState(updateState + 1);
	}, [])

	return (
		<div className = "bg-stone-900 min-h-screen">
			<NavBar/>
			<div className = "absolute bottom-3 right-3">
				<Toast onClose = {() => setToast({...toast, active: false})} show = {toast.active} delay = {5000} autohide>
					<Toast.Header>
						<strong className="me-auto">Alert</strong>
					</Toast.Header>
					<Toast.Body>{toast.message}</Toast.Body>
				</Toast>
			</div>
				
			<Routes>
				<Route path = "/" element = {<Login setToast = {setToast}/>} />
				<Route path = "/register" element = {<Registration setToast = {setToast}/>} />
				<Route path = "/users" element = {<Users setToast = {setToast}/>} />
				<Route path = "/reimbursements" element = {<Reimbursements setToast = {setToast}/>} />
				<Route path = "/reimbursements/all" element = {<ReimbursementsAdmin setToast = {setToast}/>} />
			</Routes>
		</div>
	)
}

export default App;
