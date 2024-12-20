package com.revature.services;

import com.revature.daos.TeamDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Team;
import com.revature.models.dtos.IncomingUserDTO;
import com.revature.models.User;
import com.revature.models.dtos.OutgoingUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserDAO userDAO;
    private final TeamDAO teamDAO;

    @Autowired
    public UserService(UserDAO userDAO, TeamDAO teamDAO) {
        this.userDAO = userDAO;
        this.teamDAO = teamDAO;
    }

    public User insertUser(IncomingUserDTO userDTO) {
        // uid gets autogenned
        // can add .orElseThrow() at the end here, comes with Optional
        User user = new User(0, userDTO.getUsername(), userDTO.getPassword(), userDTO.getRole(), null);

        // findById returns an Optional which we can use to avoid nulls and help with error handling
        Optional<Team> team = teamDAO.findById(userDTO.getTeamId());

        if (team.isEmpty()) throw new IllegalArgumentException("No team found with id " + userDTO.getTeamId());

        user.setTeam(team.get());
        return userDAO.save(user);
    }

    public User updateUserPassword(int userId, String newPassword) {
        // If optional is empty, throw exception
        User user = userDAO.findById(userId).orElseThrow(() -> {
            throw new IllegalArgumentException("No user found with ID " + userId);
        });

        user.setPassword(newPassword);
        // updates also use save(), object is still connected to database
        return userDAO.save(user);
    }

    // return users without password field
    public List<OutgoingUserDTO> getAllUsers() {
        List<OutgoingUserDTO> outgoingUsers = new ArrayList<>();
        List<User> users = userDAO.findAll(Sort.by(Sort.Direction.ASC, "userId"));

        for (User user : users) {
            outgoingUsers.add(new OutgoingUserDTO(
                    user.getUserId(),
                    user.getUsername(),
                    user.getRole(),
                    user.getTeam()
            ));
        }

        return outgoingUsers;
    }
}
