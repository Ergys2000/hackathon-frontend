package com.bitbalancers.hackathon.controllers;


import com.bitbalancers.hackathon.db_models.User;
import com.bitbalancers.hackathon.http_models.ResponseWrapper;
import com.bitbalancers.hackathon.services.UsersService;
import com.bitbalancers.hackathon.util.AuthLevelVerifier;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/admin/{userId}")
public class AdminController {

    @Autowired
    private AuthLevelVerifier authLevelVerifier;

    @Autowired
    private UsersService usersService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseWrapper<User> getAdminData(@RequestHeader("Authorization") String authHeader, @PathVariable(value="userId") Long adminId) {
        try {
            User user = authLevelVerifier.verifyLevel(authHeader, "admin", adminId);
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, user, "Admin data pulled succesfully!");
        } catch (Exception e) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, e.getMessage());
        }
    }

    @PutMapping
    public ResponseWrapper<User> updateAdminData(@RequestHeader("Authorization") String authHeader, @PathVariable(value="userId") Long adminId,
                                              @RequestBody JsonNode request) {
        try {
            User user = authLevelVerifier.verifyLevel(authHeader, "admin", adminId);

            String username = request.get("username").asText();
            String email = request.get("email").asText();
            String password = request.get("password").asText();

            if(!username.equals("")) user.setUsername(username);
            if(!email.equals("")) user.setEmail(email);
            if(!password.equals("")) user.setPassword(passwordEncoder.encode(password));

            usersService.updateUser(user);
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Admin data has been updated succesfully!");
        } catch (Exception e) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, e.getMessage());
        }
    }
}

