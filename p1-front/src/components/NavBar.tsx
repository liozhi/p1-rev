import React from "react";
import { Button } from "react-bootstrap";
import { store } from "../store";
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {

	const navigate = useNavigate();

	return (
		<div className = "flex flex-row justify-start align-center gap-6">
			<div className = "flex flex-col justify-center align-center pl-6">	
				<p className = "font-black text-2xl text-white text-center">Company Reimbursement</p>
			</div>
			<div className = "flex flex-row justify-start align-center align-items-center p-3 gap-2">
				
				{store.loggedInUser.userId <= 0 ? <Button onClick = {() => navigate("/")}>Login</Button> : null}
				{store.loggedInUser.userId <= 0 ? <Button onClick = {() => navigate("/register")}>Register</Button> : null}
				{(store.loggedInUser.userId > 0) && (store.loggedInUser.role === "manager") ? <Button onClick = {() => navigate("/users")}>Users</Button> : null}
				{(store.loggedInUser.userId > 0) && (store.loggedInUser.role === "manager") ? <Button onClick = {() => navigate("/reimbursements/all")}>All Reimbursements</Button> : null}
				{store.loggedInUser.userId > 0 ? <Button onClick = {() => navigate("/reimbursements")}>Your Reimbursements</Button> : null}
				{store.loggedInUser.userId > 0 ? <p className = "font-bold text-white text-lg text-center pl-3">Logged in as {store.loggedInUser.firstName + " " + store.loggedInUser.lastName}</p> : null}
			</div>	
		</div>
	)
}

export default NavBar;