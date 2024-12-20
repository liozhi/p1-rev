import Registration from './components/Registration';
import Login from './components/Login';
import Teams from './components/Teams';
import Users from './components/Users';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.css'; // required for bootstrap to work

const App = () => {

	const navigate = useNavigate();

	return (
		<>
			<Button onClick = {() => navigate("/")}>Login</Button>
			<Button onClick = {() => navigate("/register")}>Register</Button>
			<Button onClick = {() => navigate("/teams")}>Teams</Button>
			<Button onClick = {() => navigate("/users")}>Users</Button>
				
			<Routes>
				<Route path = "/" element = {<Login/>} />
				<Route path = "/register" element = {<Registration/>} />
				<Route path = "/teams" element = {<Teams/>} />
				<Route path = "/users" element = {<Users/>} />
			</Routes>
		</>
	)
}

export default App;
