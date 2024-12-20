package com.revature.services;

// Service layer - business logic like data validation, data manipulation, authentication, etc

import com.revature.daos.TeamDAO;
import com.revature.models.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    private final TeamDAO teamDAO;

    @Autowired
    public TeamService(TeamDAO teamDAO) {
        this.teamDAO = teamDAO;
    }

    public Team insertTeam(Team team) {
        if (team.getTeamName() == null || team.getTeamName().isEmpty()) {
            throw new IllegalArgumentException("Team name can't be null or blank");
        }
        if (team.getTeamLocation() == null || team.getTeamLocation().isEmpty()) {
            throw new IllegalArgumentException("Team location can't be null or blank");
        }

        return teamDAO.save(team);
    }

    public List<Team> getTeams() {
        return teamDAO.findAll();
    }

    public List<Team> getTeamsByLocation(String loc) {
        if (loc == null || loc.isEmpty()) {
            throw new IllegalArgumentException("Team location can't be null or blank");
        }
        return teamDAO.findByTeamLocation(loc);
    }
}
