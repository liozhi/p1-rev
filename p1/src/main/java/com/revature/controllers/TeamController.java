package com.revature.controllers;

import com.revature.models.Team;
import com.revature.services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // combines @Controller/@ResponseBody
@RequestMapping("/teams") // requests sent to [url]/teams are sent here
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true") // allows http requests from anywhere
public class TeamController {

    // @Autowired here is "field injection" - bad because it breaks encapsulation
    private TeamService teamService;

    @Autowired // constructor injection
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @PostMapping
    public ResponseEntity<Team> insertTeam(@RequestBody Team team){
        Team newTeam = teamService.insertTeam(team);
        return ResponseEntity.ok(newTeam);
    }

    @GetMapping
    public ResponseEntity<List<Team>> getTeams() {
        return ResponseEntity.ok(teamService.getTeams());
    }

    @GetMapping("/location/{loc}")
    public ResponseEntity<List<Team>> getTeamsByLocation(@PathVariable String loc) {
        List<Team> listTeams = teamService.getTeamsByLocation(loc);
        if (listTeams.isEmpty()) return ResponseEntity.status(404).body(listTeams);
        return ResponseEntity.ok(listTeams);
    }

}
