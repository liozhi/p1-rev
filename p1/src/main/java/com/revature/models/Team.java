package com.revature.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@Component // makes the class a Bean
@Entity // makes a database table based on the class
@Table(name = "teams") // specify properties of the table, such as table name
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment integers
    private int teamId;

    @Column(nullable = false)
    private String teamName;

    @Column(nullable = false)
    private String teamLocation;

    // cascade - defines how changes to a Team record affects dependent User records - ALL -> affect all dependent records
    @OneToMany(mappedBy = "team", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore // prevents circular reference
    private List<User> users;

    public Team() {
    }

    public Team(int teamId, String teamName, String teamLocation, List<User> users) {
        this.teamId = teamId;
        this.teamName = teamName;
        this.teamLocation = teamLocation;
        this.users = users;
    }

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getTeamLocation() {
        return teamLocation;
    }

    public void setTeamLocation(String teamLocation) {
        this.teamLocation = teamLocation;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "Team{" +
                "teamId=" + teamId +
                ", teamName='" + teamName + '\'' +
                ", teamLocation='" + teamLocation + '\'' +
                ", users='" + users +
                '}';
    }
}
