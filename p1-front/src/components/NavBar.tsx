import React from "react";
import { Button } from "react-bootstrap";

import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {

	const navigate = useNavigate();

	return (
		<div className = "flex flex-row justify-start align-center gap-6">
			<div className = "flex flex-col justify-center align-center pl-6">	
				<p className = "font-black text-2xl text-white text-center">Company Reimbursement</p>
			</div>
			<div className = "flex flex-row justify-start align-center p-3 gap-2">
				<Button onClick = {() => navigate("/")}>Login</Button>
				<Button onClick = {() => navigate("/register")}>Register</Button>
				<Button onClick = {() => navigate("/users")}>Users</Button>
				<Button onClick = {() => navigate("/reimbursements")}>Reimbursements</Button>
			</div>	
		</div>
	)
}

export default NavBar;