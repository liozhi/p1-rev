package com.revature.models.dtos;

// "Data Transfer Object"
// Models incoming JSON data for a new user
// can use int for team id instead of a Team object

// DTOs will be converted into their respective model in the Service layer
// no annotation needed
public class IncomingUserDTO {

    private String username;
    private String password;
    private String role = "player";
    private int teamId;

    public IncomingUserDTO() {
    }

    public IncomingUserDTO(String username, String password, String role, int teamId) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.teamId = teamId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }

    @Override
    public String toString() {
        return "IncomingUserDTO{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", teamId=" + teamId +
                '}';
    }
}
