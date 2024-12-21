import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { store } from "../store";

interface User {
	username: string,
	password: string
}

const Login: React.FC = () => {

	const navigate = useNavigate();

	const [user, setUser] = useState<User>({
		username: "",
		password: ""
	});

	const storeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
		//console.log(e);

		const name = e.target.name;
		const value = e.target.value;

		setUser((user) => ({...user, [name]: value}));

	}

	const login = async () => {
		if (user.username != "" && user.password != "") {
			await axios.post("http://localhost:4444/auth", user, {withCredentials: true})
			.then((res) => {
				store.loggedInUser = res.data;
				localStorage.setItem("reimbUser", JSON.stringify(res.data));
				alert("Logged in as " + store.loggedInUser.username)
				if (res.data.role === "user") {
					navigate("/reimbursements");
				} else {
					navigate("/users");
				}
			})
			.catch((error) => {
				console.log(error);
				alert("Login failed!");
			})
		}
	}

	return (
		<>
			<Container className = "d-flex flex-column justify-content-center align-items-center mt-5 gap-1">
				<p>Login</p>
				
				<div>
					<Form.Control
						type = "text"
						placeholder = "usename"
						name = "username"
						onChange = {storeValues}
					/>
				</div>
				<div>
					<Form.Control
						type = "password"
						placeholder = "password"
						name = "password"
						onChange = {storeValues}
					/>
				</div>
				<div className = "d-flex flex-row gap-1">
					<Button onClick = {() => login()}>Login</Button>
					<Button onClick = {() => navigate("/register")}>Register</Button>
				</div>
			</Container>
		</>
	)
}

export default Login;
