import Registration from './components/Registration';
import Login from './components/Login';
import Users from './components/Users';

import { Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css'; // required for bootstrap to work
import { useEffect } from 'react';
import { store } from './store';
import Reimbursements from './components/Reimbursements';

// import './App.css';
import './index.css';
import NavBar from './components/NavBar';

const App = () => {

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("reimbUser")!);
		if (userData === null || userData === undefined) store.loggedInUser = { userId: 0, username: "", role: "", firstName: "", lastName: ""};
		if (userData != "") store.loggedInUser = userData;
	}, [])

	return (
		<div className = "bg-stone-900 min-h-screen">
			<NavBar/>
				
			<Routes>
				<Route path = "/" element = {<Login/>} />
				<Route path = "/register" element = {<Registration/>} />
				<Route path = "/users" element = {<Users/>} />
				<Route path = "/reimbursements" element = {<Reimbursements/>} />
			</Routes>
		</div>
	)
}

export default App;
