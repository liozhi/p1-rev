import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { store } from "../store";
import { useNavigate } from "react-router-dom";

interface User {
	userId: number,
	username: string,
	role: string,

	firstName: string,
	lastName: string
}

const Users: React.FC = () => {

	const [users, setUsers] = useState<User[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (store.loggedInUser.role !== "manager") navigate("/");
		getUsers();
	}, []);

	const getUsers = async () => {
		await axios.get("http://localhost:4444/users", {withCredentials: true})
		.then((res) => {
			setUsers(res.data);
			console.log(res.data);
		})
		.catch((error) => {
			console.log(error);
		});
	}

	return (
		<>
			<div className = "flex flex-col justify-center align-center w-2/3 m-auto gap-2">
				<p className = "font-black text-4xl text-white text-center">Users</p>

				<Table striped hover variant="dark">
					<thead>
						<tr>
							<th>ID</th>
							<th>Username</th>
							<th>Name</th>
							<th>Role</th>
							<th>Options</th>
						</tr>
					</thead>
					
					<tbody>
						{users.map((user: User) => {
							return (
								<tr id = {"user" + user.userId}>
									<td>{user.userId}</td>
									<td>{user.username}</td>
									<td>{user.firstName + " " + user.lastName}</td>
									<td>{String(user.role).charAt(0).toUpperCase() + String(user.role).slice(1)}</td>
									<td><Button className = "btn-danger" onClick = {() => alert("Deleted user id " + user.userId)}>Delete</Button></td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</div>
		</>
	)
}

export default Users;
