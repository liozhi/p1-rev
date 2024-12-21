import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";

interface User {
	userId: number,
	username: string,
	role: string,

	firstName: string,
	lastName: string
}

const Users: React.FC = () => {

	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
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
			<p>Users</p>

			<Container>
				<Table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Role</th>
							<th>Team Name</th>
							<th>Options</th>
						</tr>
					</thead>
					
					<tbody>
						{users.map((user: User) => {
							return (
								<tr id = {"user" + user.userId}>
									<td>{user.userId}</td>
									<td>{user.username}</td>
									<td>{user.firstName}</td>
									<td>{user.lastName}</td>
									<td>{user.role}</td>
									<td>
										{user.role === "player" 
											? <Button className = "btn-info" onClick = {() => alert("Promoted user id " + user.userId)}>Promote</Button>
											: <Button className = "btn-danger" onClick = {() => alert("Demoted user id " + user.userId)}>Demote</Button>
										}
									</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</Container>
		</>
	)
}

export default Users;
