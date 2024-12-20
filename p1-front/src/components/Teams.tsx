import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Team {
	teamId: number,
	teamName: string,
	teamLocation: string
}

const Teams: React.FC = () => {

	const [teams, setTeams] = useState<Team[]>([]);

	useEffect(() => {
		getTeams();
	}, []);

	const getTeams = async () => {
		const response = await axios.get("http://localhost:4444/teams", {withCredentials: true})
		.then((res) => {
			setTeams(res.data);
			console.log(res.data);
		})
		.catch((error) => {
			console.log(error);
		});
	}

	return (
		<>
			<p>Teams</p>

			<Container>
				<Table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Location</th>
							<th>Options</th>
						</tr>
					</thead>
					
					<tbody>
						{teams.map((team: Team) => {
							return (
								<tr id = {"team" + team.teamId}>
									<td>{team.teamId}</td>
									<td>{team.teamName}</td>
									<td>{team.teamLocation}</td>
									<td><Button className = "btn-danger" onClick = {() => alert("Deleted team id " + team.teamId)}>Delete</Button></td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</Container>
		</>
	)
}

export default Teams;
