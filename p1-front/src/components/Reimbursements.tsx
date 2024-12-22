import axios from "axios";
import { useEffect, useState } from "react";
import { store } from "../store";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";

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

interface ReimbursementForm {
	description: string,
	amount: number
}


const Reimbursements: React.FC = () => {

	const [re, setRe] = useState<Reimbursement[]>([]);
	const navigate = useNavigate();

	const [showModal, setShowModal] = useState<boolean>(false);
	const handleClose = () => setShowModal(false);
	const handleOpen = () => setShowModal(true);

	const [reForm, setReForm] = useState<ReimbursementForm>({
		description: "",
		amount: 0
	});

	useEffect(() => {
		getReimbs();
	}, []);

	const getReimbs = async () => {
		await axios.get("http://localhost:4444/reimb/" + store.loggedInUser.userId, { withCredentials: true })
			.then((res) => {
				setRe(res.data);
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.data === "User is not logged in") {
						store.loggedInUser = { userId: 0, username: "", role: "", firstName: "", lastName: "" };
						localStorage.setItem("reimbUser", JSON.stringify({ userId: 0, username: "", role: "", firstName: "", lastName: "" }));
						navigate("/");
					}
				}
			});
	}
	const storeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name;
		const value = e.target.value;

		setReForm((reForm) => ({...reForm, [name]: value}));
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		await axios.post("http://localhost:4444/reimb", {
			description: reForm.description,
			amount: reForm.amount,
			userId: store.loggedInUser.userId
		}, {withCredentials: true})
		.then((res) => {
			console.log(res);
			handleClose();
			getReimbs();
		})
		.catch((error) => {
			console.log(error);
		})
	}

	return (
		<>
			<Modal show = {showModal} onHide = {handleClose}>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Amount</Form.Label>
							<Form.Control
								type="number"
								name = "amount"
								onChange = {storeValues}
								autoFocus
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>Description</Form.Label>
							<Form.Control as="textarea" rows={2} name = "description" onChange = {storeValues}/>
						</Form.Group>
					</Form>
					<Button variant = "secondary" onClick = {handleClose}>
						Close
					</Button>
					<Button variant = "primary" onClick = {handleSubmit}>
						Submit
					</Button>
				</Modal.Body>
			</Modal>
			<div className = "flex flex-col justify-center align-center w-2/3 m-auto gap-2">
				<p className = "font-black text-4xl text-white text-center">Your Reimbursements</p>
				<div className = "flex flex-row flex-initial justify-left align-center">
					<Button onClick = {handleOpen}>New reimbursement</Button>
				</div>
				<Table striped hover variant="dark">
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
								<tr key={"reim" + reim.reimbursementId}>
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
			</div>
		</>
	)
}

export default Reimbursements;