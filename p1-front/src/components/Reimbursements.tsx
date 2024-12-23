import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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

interface ReimbursementForm {
	description: string,
	amount: number
}

interface ToastMsg {
	active: boolean,
	message: string
}

interface ReimbursementsProps {
	setToast: Dispatch<SetStateAction<ToastMsg>>
}

interface Editing {
	active: boolean,
	reId: number
}

const Reimbursements: React.FC<ReimbursementsProps> = ({setToast}: ReimbursementsProps) => {

	const [re, setRe] = useState<Reimbursement[]>([]);
	const [shownRe, setShownRe] = useState<Reimbursement[]>([]);
	const navigate = useNavigate();

	const [showModal, setShowModal] = useState<boolean>(false);
	const handleClose = () => { setShowModal(false); setEditing({active: false, reId: 0});}
	const handleOpen = () => setShowModal(true);

	const [showOnlyPending, setShowOnlyPending] = useState<boolean>(false);

	const [reForm, setReForm] = useState<ReimbursementForm>({
		description: "",
		amount: 0
	});

	const [editing, setEditing] = useState<Editing>({active: false, reId: 0});

	useEffect(() => {
		getReimbs();
	}, []);

	useEffect(() => {
		filterReimbursements();
	}, [showOnlyPending])

	const getReimbs = async () => {
		await axios.get("http://localhost:4444/reimb/" + store.loggedInUser.userId, { withCredentials: true })
			.then((res) => {
				setRe(res.data);
				setShownRe(res.data);
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.data === "User is not logged in") {
						store.loggedInUser = { userId: 0, username: "", role: "", firstName: "", lastName: "" };
						localStorage.setItem("reimbUser", JSON.stringify({ userId: 0, username: "", role: "", firstName: "", lastName: "" }));
						setToast({active: true, message: "You are not logged in!"})
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
			setToast({active: true, message: "New reimbursement added successfully!"})
			handleClose();
			getReimbs();
		})
		.catch((error) => {
			console.log(error);
			setToast({active: true, message: "Something went wrong when adding a reimbursement."})
		})
	}

	const filterReimbursements = () => {
		if (showOnlyPending) {
			const newRe: Reimbursement[] = re.filter((r: Reimbursement) => {
				return (r.status === "pending")
			});
			setShownRe(newRe);
		} else {
			setShownRe(re);
		}
	}

	const deleteReim = async (reId: number) => {
		await axios.delete("http://localhost:4444/reimb/" + reId, {withCredentials: true})
		.then((res) => {
			console.log(res.data);
			setToast({active: true, message: "Deleted reimbursement with id " + reId + "!"})
			getReimbs();
		})
		.catch((error) => {
			console.log(error);
			setToast({active: true, message: "Something went wrong when deleting reimbursement with id " + reId + "."})
		})
	}

	const editReim = async(e: any) => {
		e.preventDefault();
		console.log(reForm.description);
		await axios.patch("http://localhost:4444/reimb", {
			reimbursementId: editing.reId,
			description: reForm.description
		}, {withCredentials: true})
		.then((res) => {
			console.log(res.data);
			setToast({active: true, message: "Edited reimbursement with id " + editing.reId + "!"})
			handleClose();
			getReimbs();
		})
		.catch((error) => {
			console.log(error);
			setToast({active: true, message: "Something went wrong when editing reimbursement with id " + editing.reId + "."})
		})
	}

	return (
		<>
			<Modal show = {showModal} onHide = {handleClose}>
				<Modal.Body>
					<Form>
						{!editing.active
						? <Form.Group className="mb-3" controlId="amountControl">
							<Form.Label>Amount</Form.Label>
							<Form.Control
								type = "number"
								name = "amount"
								onChange = {storeValues}
								autoFocus
							/>
						</Form.Group>
						: null}
						<Form.Group className="mb-3" controlId="descriptionControl">
							<Form.Label>Description</Form.Label>
							<Form.Control as = "textarea" rows = {2} name = "description" onChange = {storeValues}/>
						</Form.Group>
					</Form>
					<Button variant = "secondary" onClick = {handleClose}>
						Close
					</Button>
					{!editing.active
					? <Button variant = "primary" onClick = {handleSubmit}>
						Submit
					</Button>
					: <Button variant = "primary" onClick = {editReim}>
						Submit
					</Button>
					}
					
				</Modal.Body>
			</Modal>
			<div className = "flex flex-col justify-center align-center w-2/3 m-auto gap-2">
				<p className = "font-black text-4xl text-white text-center">Your Reimbursements</p>
				<div className = "flex flex-row flex-initial justify-left align-center gap-2">
					<Button onClick = {handleOpen}>New reimbursement</Button>
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
							<th>Amount</th>
							<th>Desc</th>
							<th>Status</th>
							<th>Actions</th>
							<th> </th>
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
									<td>{"$" + reim.amount}</td>
									<td>{reim.description}</td>
									<td><p className = {statusClass}>{reim.status.toUpperCase()}</p></td>
									{reim.status === "pending" ? <td><Button className = "btn-danger" onClick = {() => deleteReim(reim.reimbursementId)}>Delete</Button></td> : <td></td>}
									{reim.status === "pending" ? <td><Button className = "btn-secondary" onClick = {() => {handleOpen(); setEditing({active: true, reId: reim.reimbursementId})}}>Edit</Button></td> : <td></td>}
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