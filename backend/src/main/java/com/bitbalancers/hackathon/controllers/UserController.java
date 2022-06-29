package com.bitbalancers.hackathon.controllers;

import com.bitbalancers.hackathon.db_models.User;
import com.bitbalancers.hackathon.http_models.ResponseWrapper;
import com.bitbalancers.hackathon.services.UsersService;
import com.bitbalancers.hackathon.util.AuthLevelVerifier;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Arjol Panci (U760154)
 * @since 25-Jun-2022
 */

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

    @Autowired
    private AuthLevelVerifier authLevelVerifier;

    @Autowired
    private UsersService usersService;

    @DeleteMapping("/{user-id}")
    public ResponseWrapper<String> getAllUsers(@RequestHeader("Authorization") String authHeader,
                                                   @PathVariable(value = "user-id") Long userId) {
        try {
            String token = authHeader.split(" ")[1];
            authLevelVerifier.verifyTokenAuthLevel(token, "admin");
            User user = usersService.findByid(userId);
            usersService.delete(user);
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "User has been deleted!");
        } catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseWrapper<String> updateUser(@RequestHeader("Authorization") String authHeader,
                                              @PathVariable(value = "id") Long userId,
                                              @RequestBody User user) {
        try {
            String token = authHeader.split(" ")[1];
            authLevelVerifier.verifyTokenAuthLevel(token, "admin");
            User currentData = usersService.findByid(userId);
            user.setPassword(currentData.getPassword());
            user.setRole(currentData.getRole());
            usersService.updateUser(user);
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "User has been updated!");
        }catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

    @GetMapping("/{user-id}")
    public ResponseWrapper<User> getUserById(@RequestHeader("Authorization") String authHeader,
                                               @PathVariable(value = "user-id") Long userId) {
        try {
            String token = authHeader.split(" ")[1];
            authLevelVerifier.verifyTokenAuthLevel(token, "admin");
            User user = usersService.findByid(userId);
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, user, "User data has been retrieved!");
        } catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

    @GetMapping
    public ResponseWrapper<List<User>> getAllUsers(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.split(" ")[1];
            authLevelVerifier.verifyTokenAuthLevel(token, "admin");
            List<User> users = usersService.getAllUsers();
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, users, "Admin data has been updated succesfully!");
        } catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

}
