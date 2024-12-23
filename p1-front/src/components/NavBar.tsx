import React from "react";
import { Button } from "react-bootstrap";
import { store } from "../store";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const NavBar: React.FC = () => {

	const navigate = useNavigate();

	const logout = async () => {
		await axios.post("http://localhost:4444/auth/logout", { withCredentials: true })
		.then((res) => {
			console.log(res);
			store.loggedInUser = { userId: 0, username: "", role: "", firstName: "", lastName: "" };
			localStorage.setItem("reimbUser", JSON.stringify({ userId: 0, username: "", role: "", firstName: "", lastName: "" }));
			navigate("/");
		})
		.catch((error) => {
			console.log(error);
		});
	}

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
				{store.loggedInUser.userId > 0 ? <Button className = "btn-danger" onClick = {() => logout()}>Log Out</Button> : null}
			</div>	
		</div>
	)
}

export default NavBar;