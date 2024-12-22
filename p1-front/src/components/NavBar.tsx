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
			<div className = "flex flex-row justify-start align-center p-3 gap-2">
				
				{store.loggedInUser.userId <= 0 ? <Button onClick = {() => navigate("/")}>Login</Button> : null}
				{store.loggedInUser.userId <= 0 ? <Button onClick = {() => navigate("/register")}>Register</Button> : null}
				<Button onClick = {() => navigate("/users")}>Users</Button>
				{store.loggedInUser.userId > 0 ? <Button onClick = {() => navigate("/reimbursements")}>Reimbursements</Button> : null}
			</div>	
		</div>
	)
}

export default NavBar;