import axios from "axios";
import { useEffect, useState } from "react";
import { store } from "../store";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Modal, Form, ToggleButton } from "react-bootstrap";

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

const ReimbursementsAdmin: React.FC = () => {

	const [re, setRe] = useState<Reimbursement[]>([]);
	const [shownRe, setShownRe] = useState<Reimbursement[]>([]);
	const navigate = useNavigate();

	const [showOnlyPending, setShowOnlyPending] = useState<boolean>(false);

	useEffect(() => {
		getReimbs();
	}, []);

	useEffect(() => {
		filterReimbursements(re);
	}, [showOnlyPending])
	
	const filterReimbursements = (reList: Reimbursement[]) => {
		console.log(reList);
		if (showOnlyPending) {
			const newRe: Reimbursement[] = reList.filter((r: Reimbursement) => {
				return (r.status === "pending")
			});
			setShownRe(newRe);
		} else {
			setShownRe(reList);
		}
	}

	const getReimbs = async () => {
		await axios.get("http://localhost:4444/reimb/all", { withCredentials: true })
			.then((res) => {
				setRe(res.data);
				filterReimbursements(res.data);
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.data === "User is not logged in") {
						store.loggedInUser = { userId: 0, username: "", role: "", firstName: "", lastName: "" };
						localStorage.setItem("reimbUser", JSON.stringify({ userId: 0, username: "", role: "", firstName: "", lastName: "" }));
						navigate("/");
					} else if (error.response.data === "Authorization invalid") {
						navigate("/");
					}
				}
			});
	}

	const updateReimb = async(id: number, status: string) => {
		await axios.patch("http://localhost:4444/reimb/all", {reimbursementId: id, status: status}, { withCredentials: true })
		.then((res) => {
			console.log(res.data);
			getReimbs();
		})
	}

	return (
		<>
			<div className = "flex flex-col justify-center align-center w-2/3 m-auto gap-2">
				<p className = "font-black text-4xl text-white text-center">Employee Reimbursements</p>
				<div className = "flex flex-row flex-initial justify-left align-center">
					<ToggleButton 
						id = "toggle-pending"
						type = "checkbox"
						variant = "outline-warning"
						value = "1"
						checked = {showOnlyPending}
						onChange={(e) => setShowOnlyPending(e.currentTarget.checked)}
					>
						Show only pending
					</ToggleButton>
				</div>
				<Table striped hover variant="dark">
					<thead>
						<tr>
							<th>ID</th>
							<th>Employee</th>
							<th>Amount</th>
							<th>Desc</th>
							<th>Status</th>
							<th>Actions</th>
							<th> 	</th>
						</tr>
					</thead>

					<tbody>
						{shownRe.map((reim: Reimbursement) => {
							let statusClass = "font-bold";
							switch (reim.status) {
								case "pending":		statusClass += " text-amber-400";		break;
								case "accepted":	statusClass += " text-green-500";		break;
								case "denied":		statusClass += " text-red-500";			break;
							}
							return (
								<tr key={"reim" + reim.reimbursementId}>
									<td>{reim.reimbursementId}</td>
									<td>{reim.user.firstName + " " + reim.user.lastName}</td>
									<td>{"$" + reim.amount}</td>
									<td>{reim.description}</td>
									<td><p className = {statusClass}>{reim.status.toUpperCase()}</p></td>
									{reim.status === "pending" 
										? <td><Button className = "btn-success" onClick = {() => updateReimb(reim.reimbursementId, "accepted")}>Accept</Button></td>
										: <td> </td>
									}
									{reim.status === "pending" 
										? <td><Button className = "btn-danger" onClick = {() => updateReimb(reim.reimbursementId, "denied")}>Deny</Button></td>
										: <td> </td>
									}
								</tr>
							)
						})}
					</tbody>
				</Table>
			</div>
		</>
	)
}

export default ReimbursementsAdmin;