package com.revature.services;

import com.revature.controllers.AuthController;
import com.revature.daos.AuthDAO;
import com.revature.models.User;
import com.revature.models.dtos.LoginDTO;
import com.revature.models.dtos.OutgoingUserDTO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthDAO authDAO;

    @Autowired
    public AuthService(AuthDAO authDAO) {
        this.authDAO = authDAO;
    }

    public OutgoingUserDTO login(LoginDTO loginDTO) {
        User u = authDAO.findByUsernameAndPassword(loginDTO.getUsername(), loginDTO.getPassword());
        if (u == null) throw new IllegalArgumentException("No user found with sent credentials");

        return new OutgoingUserDTO(u.getUserId(), u.getUsername(), u.getRole(), u.getTeam());
    }
}
