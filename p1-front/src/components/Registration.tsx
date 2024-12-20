import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

interface User {
	username: string,
	password: string,
	teamId: number
}

const Registration: React.FC = () => {

	const [newUser, setNewUser] = useState<User>({
		username: "",
		password: "",
		teamId: -1,
	});

	const storeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e);

		const name = e.target.name;
		const value = e.target.value;

		setNewUser((newUser) => ({...newUser, [name]: value}));

	}

	const register = async () => {
		const response = await axios.post("http://localhost:4444/users", newUser, {withCredentials: true})
		.then((res) => {
			console.log("Created user " + newUser.username)
		})
		.catch((error) => {
			console.log(error)
		})
	}

	return (
		<>
			<Container className = "d-flex flex-column justify-content-center align-items-center mt-5 gap-1">
				<p>Register</p>
				
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
						type = "number"
						placeholder = "team ID"
						name = "teamId"
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
				<div>
					<Button onClick = {() => register()}>Register</Button>
				</div>
			</Container>
		</>
	)
}

export default Registration;
