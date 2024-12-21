import axios from "axios";
import { useEffect, useState } from "react";
import { store } from "../store";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";

interface User {
	userId: number,
	username: string,
	role: string,

	firstName: string,
	lastName: string
}

interface Reimbursement {
	reimbursementId: number,
	description: string,
	amount: number,
	status: string,
	user: User
}


const Reimbursements: React.FC = () => {

	const [re, setRe] = useState<Reimbursement[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		getReimbs();
	}, []);

	const getReimbs = async () => {
		await axios.get("http://localhost:4444/reimb/" + store.loggedInUser.userId, {withCredentials: true})
		.then((res) => {
			setRe(res.data);
		})
		.catch((error) => {
			if (error.response) {
				if (error.response.data === "User is not logged in") {
				store.loggedInUser = { userId: 0, username: "", role: "", firstName: "", lastName: ""};
				localStorage.setItem("reimbUser", JSON.stringify({ userId: 0, username: "", role: "", firstName: "", lastName: ""}));
				navigate("/");
			}
			}
		});
	}

	return (
		<>
			<Container>
				<Table striped hover variant = "dark">
					<thead>
						<tr>
							<th>ID</th>
							<th>Desc</th>
							<th>Amount</th>
							<th>Status</th>
							<th>Employee</th>
						</tr>
					</thead>
					
					<tbody>
						{re.map((reim: Reimbursement) => {
							return (
								<tr id = {"reim" + reim.reimbursementId}>
									<td>{reim.reimbursementId}</td>
									<td>{reim.description}</td>
									<td>{reim.amount}</td>
									<td>{reim.status}</td>
									<td>{reim.user.firstName}</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</Container>
		</>
	)
}

export default Reimbursements;