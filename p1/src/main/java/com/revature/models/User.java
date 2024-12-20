package com.revature.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.List;

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
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String role = "user"; // Default to this value

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore // prevents circular reference
    private List<Reimbursement> reimbursements;

    public User() {
    }

    public User(int userId, String username, String password, String role, String firstName, String lastName, List<Reimbursement> reimbursements) {
        this.userId = userId;
        this.role = role;
        this.lastName = lastName;
        this.firstName = firstName;
        this.password = password;
        this.username = username;
        this.reimbursements = reimbursements;
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<Reimbursement> getReimbursements() {
        return reimbursements;
    }

    public void setReimbursements(List<Reimbursement> reimbursements) {
        this.reimbursements = reimbursements;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", role='" + role + '\'' +
                ", reimbursements='" + reimbursements + '\'' +
                '}';
    }
}
