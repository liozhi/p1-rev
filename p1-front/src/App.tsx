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

const App = () => {

	const [updateState, setUpdateState] = useState<number>(0); // forcing state updates, thanks react
	
	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("reimbUser")!);
		if (userData === null || userData === undefined) store.loggedInUser = { userId: 0, username: "", role: "", firstName: "", lastName: ""};
		if (userData != "") store.loggedInUser = userData;
		setUpdateState(updateState + 1);
	}, [])

	return (
		<div className = "bg-stone-900 min-h-screen">
			<NavBar/>
				
			<Routes>
				<Route path = "/" element = {<Login/>} />
				<Route path = "/register" element = {<Registration/>} />
				<Route path = "/users" element = {<Users/>} />
				<Route path = "/reimbursements" element = {<Reimbursements/>} />
				<Route path = "/reimbursements/all" element = {<ReimbursementsAdmin/>} />
			</Routes>
		</div>
	)
}

export default App;
