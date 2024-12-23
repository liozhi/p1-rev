import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface User {
	username: string,
	password: string,
	firstName: string,
	lastName: string
}

interface ToastMsg {
	active: boolean,
	message: string
}

interface RegistrationProps {
	setToast: Dispatch<SetStateAction<ToastMsg>>
}

const Registration: React.FC<RegistrationProps> = ({setToast}: RegistrationProps) => {

	const navigate = useNavigate();

	const [newUser, setNewUser] = useState<User>({
		username: "",
		password: "",
		firstName: "",
		lastName: "",
	});

	const storeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name;
		const value = e.target.value;

		setNewUser((newUser) => ({...newUser, [name]: value}));

	}

	const register = async () => {
		await axios.post("http://localhost:4444/users", newUser, {withCredentials: true})
		.then((res) => {
			setToast({active: true, message: "Successfully signed up as " + newUser.username + "!"})
			navigate("/");
		})
		.catch((error) => {
			setToast({active: true, message: "Something went wrong when signing up."})
			console.log(error);
		})
	}

	return (
		<>
			<Container className = "d-flex flex-column justify-content-center align-items-center mt-5 gap-2">
				<p className = "font-black text-4xl text-white text-center">Register</p>
				
				<div>
					<Form.Control
						type = "text"
						placeholder = "Username"
						name = "username"
						onChange = {storeValues}
					/>
				</div>
				<div>
					<Form.Control
						type = "password"
						placeholder = "Password"
						name = "password"
						onChange = {storeValues}
					/>
				</div>
				<div>
					<Form.Control
						type = "text"
						placeholder = "First Name"
						name = "firstName"
						onChange = {storeValues}
					/>
				</div>
				<div>
					<Form.Control
						type = "text"
						placeholder = "Last Name"
						name = "lastName"
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
