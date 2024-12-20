package com.revature.models.dtos;

import com.revature.models.Team;

public class OutgoingUserDTO {

    private int userId;
    private String username;
    private String role;
    private Team team;

    public OutgoingUserDTO() {
    }

    public OutgoingUserDTO(int userId, String username, String role, Team team) {
        this.userId = userId;
        this.username = username;
        this.role = role;
        this.team = team;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    @Override
    public String toString() {
        return "OutgoingUserDTO{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", role='" + role + '\'' +
                ", team=" + team +
                '}';
    }
}
