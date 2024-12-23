import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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


interface ToastMsg {
	active: boolean,
	message: string
}

interface UsersProps {
	setToast: Dispatch<SetStateAction<ToastMsg>>
}

const Users: React.FC<UsersProps> = ({setToast}: UsersProps) => {

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
			if (error.response) {
				if (error.response.data === "User is not logged in") {
					store.loggedInUser = { userId: 0, username: "", role: "", firstName: "", lastName: "" };
					localStorage.setItem("reimbUser", JSON.stringify({ userId: 0, username: "", role: "", firstName: "", lastName: "" }));
					setToast({active: true, message: "You are not logged in!"});
					navigate("/");
				} else if (error.response.data === "Authorization invalid") {
					setToast({active: true, message: "You do not have permission to view this page!"});
					navigate("/");
				}
			}
		});
	}

	const deleteUser = async (uid: Number) => {
		if (uid === store.loggedInUser.userId) {
			setToast({active: true, message: "Cannot delete yourself!"});
			return;
		}
		await axios.delete("http://localhost:4444/users/" + uid, {withCredentials: true})
		.then((res) => {
			console.log(res.data);
			setToast({active: true, message: "Deleted user with id " + uid + "!"});
			getUsers();
		})
		.catch((error) => {
			console.log(error);
			setToast({active: true, message: "An error occured when trying to delete user with id " + uid + "."});
		})
	}

	const promoteUser = async (uid: Number) => {
		await axios.post("http://localhost:4444/users/" + uid, {withCredentials: true})
		.then((res) => {
			console.log(res.data);
			setToast({active: true, message: "Promoted user with id " + uid + " to Manager!"});
			getUsers();
		})
		.catch((error) => {
			console.log(error);
			setToast({active: true, message: "An error occured when trying to promote user with id " + uid + "."});
		})
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
							<th> </th>
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
									<td><Button className = "btn-danger" onClick = {() => deleteUser(user.userId)}>Delete</Button></td>
									{user.role === "user" ? <td><Button className = "btn-info" onClick = {() => promoteUser(user.userId)}>Promote</Button></td> : <td></td>}
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
