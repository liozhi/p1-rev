package com.revature.controllers;

import com.revature.aspects.AdminOnly;
import com.revature.models.User;
import com.revature.models.dtos.IncomingUserDTO;
import com.revature.models.dtos.OutgoingUserDTO;
import com.revature.services.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(value = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> insertUser(@RequestBody IncomingUserDTO userDTO) {
        User user = userService.insertUser(userDTO);
        return ResponseEntity.status(201).body(user);
    }

    @PatchMapping("/password/{userId}")
    public ResponseEntity<User> updateUserPassword(@PathVariable int userId, @RequestBody String newPassword) {
        return ResponseEntity.accepted().body(userService.updateUserPassword(userId, newPassword));
    }

    @GetMapping
    @AdminOnly
    public ResponseEntity<List<OutgoingUserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/{userId}")
    @AdminOnly
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable int userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{userId}")
    @AdminOnly
    public ResponseEntity<OutgoingUserDTO> promoteUser(@PathVariable int userId) {
        return ResponseEntity.accepted().body(userService.promoteUser(userId));
    }

}
