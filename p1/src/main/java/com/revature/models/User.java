package com.revature.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Component // makes the class a Bean
@Entity // makes a database table based on the class
@Table(name = "users") // specify properties of the table, such as table username
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment integers
    private int userId; // pkey

    @Column(nullable = false) // not necessary unless you want to set username/constraints
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role = "player"; // Default to this value

    // fetch defines when the dependency is loaded. lazy - load only when called, eager - load at runtime
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "teamId") // fkey
    private Team team;

    public User() {
    }

    public User(int userId, String username, String password, String role, Team team) {
        this.userId = userId;
        this.username = username;
        this.password = password;
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

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", role='" + role + '\'' +
                ", team='" + team +
                '}';
    }

}
