package com.revature.services;

import com.revature.daos.ReimbursementDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Reimbursement;
import com.revature.models.dtos.IncomingUserDTO;
import com.revature.models.User;
import com.revature.models.dtos.OutgoingUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserDAO userDAO;
    private final ReimbursementDAO reimbursementDAO;

    @Autowired
    public UserService(UserDAO userDAO, ReimbursementDAO reimbursementDAO) {
        this.userDAO = userDAO;
        this.reimbursementDAO = reimbursementDAO;
    }

    public User insertUser(IncomingUserDTO userDTO) {
        // uid gets autogenned
        // can add .orElseThrow() at the end here, comes with Optional
        List<User> existingUser = userDAO.findAllByUsername(userDTO.getUsername());
        if (!existingUser.isEmpty()) throw new IllegalArgumentException("User already exists with username " + userDTO.getUsername());
        User user = new User(0, userDTO.getUsername(), userDTO.getPassword(), "user", userDTO.getFirstName(), userDTO.getLastName(), null);

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
                    user.getFirstName(),
                    user.getLastName()
            ));
        }

        return outgoingUsers;
    }

    public void deleteUser(int uid) {
        User user = userDAO.findById(uid).orElseThrow(() -> {
            throw new IllegalArgumentException("No user found with ID " + uid);
        });
        List<Reimbursement> reList = reimbursementDAO.findAllByUserUserId(uid);
        for (Reimbursement re : reList) {
            reimbursementDAO.deleteById(re.getReimbursementId());
        }
        userDAO.deleteById(user.getUserId());
    }

    public OutgoingUserDTO promoteUser(int uid) {
        User user = userDAO.findById(uid).orElseThrow(() -> {
            throw new IllegalArgumentException("No user found with ID " + uid);
        });
        user.setRole("manager");
        userDAO.save(user);
        return new OutgoingUserDTO(user.getUserId(), user.getUsername(), user.getRole(), user.getFirstName(), user.getLastName());
    }
}
