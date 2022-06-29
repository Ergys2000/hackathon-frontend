package com.bitbalancers.hackathon.controllers;

import com.bitbalancers.hackathon.db_models.User;
import com.bitbalancers.hackathon.http_models.ResponseWrapper;
import com.bitbalancers.hackathon.services.EmailService;
import com.bitbalancers.hackathon.services.UsersService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/register")
public class RegisterController {
    @Autowired
    private UsersService usersService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseWrapper<User> registerUser(@RequestBody JsonNode requestBody) {
        try{
            String role = requestBody.get("role").asText();
            String username = requestBody.get("username").asText();
            String password = requestBody.get("password").asText();
            String email = requestBody.get("email").asText();

            if(role.equals("admin")) {
                return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "Cannot create an admin user!");
            }

            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword(passwordEncoder.encode(password));
            newUser.setRole(role);
            newUser.setEmail(email);
            usersService.saveUser(newUser);

            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "User created successfully!");
        } catch(Exception ex){
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }
}
