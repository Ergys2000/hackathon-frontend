package com.bitbalancers.hackathon.controllers;

import com.bitbalancers.hackathon.db_models.User;
import com.bitbalancers.hackathon.http_models.AuthResponse;
import com.bitbalancers.hackathon.http_models.ResponseWrapper;
import com.bitbalancers.hackathon.security.JwtUserDetailsService;
import com.bitbalancers.hackathon.services.UserPropertyService;
import com.bitbalancers.hackathon.services.UsersService;
import com.bitbalancers.hackathon.util.JwtUtils;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/authenticate")
public class AuthenticationController {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private UsersService usersService;

    @Autowired
    private UserPropertyService propertyService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/update-password/{user-id}")
    public ResponseWrapper<String> updatePassword(@PathVariable(value="user-id") Long userId,
                                                  @RequestBody JsonNode updateRequest) {
        try {
            User user = usersService.findByid(userId);
            String newPassword = updateRequest.get("newPassword").asText();
            String confirmNewPassword = updateRequest.get("confirmNewPassword").asText();
            String existingPassword = updateRequest.get("existingPassword").asText();

            if(newPassword.equals(confirmNewPassword)){
                if(passwordEncoder.matches(existingPassword, user.getPassword())) {
                    user.setPassword(passwordEncoder.encode(newPassword));
                    usersService.updateUser(user);
                    return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Password has been updated!");
                }else{
                    return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "The current password does not match!");
                }
            }
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "Password confirmation does not match!");
        } catch (Exception e) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, e.getMessage());
        }

    }

    @PostMapping("/reset-request/{user-id}/{key}")
    public ResponseWrapper<String> changePassword(@PathVariable(value="user-id") Long userId,
                                                  @PathVariable(value="key") String key) {
        try {
            User user = usersService.findByid(userId);
            if(propertyService.getPropertyForUser("reset-key", user).equals(key)) {
                return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Reset key is valid!");
            }else {
                return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "Reset key is invalid");
            }
        } catch (Exception e) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, e.getMessage());
        }
    }

    @PostMapping("/refresh")
    public ResponseWrapper<AuthResponse> refreshToken(@RequestBody JsonNode refreshRequest) {
        try {
            String username = refreshRequest.get("username").asText();
            String token = refreshRequest.get("token").asText();

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if(userDetails != null && Boolean.TRUE.equals(jwtUtils.isValid(token, userDetails))) {
                User user = usersService.findUserByUsername(userDetails.getUsername());
                String newToken = jwtUtils.generateToken(userDetails, user.getRole());
                AuthResponse response = new AuthResponse(newToken, user.getRole(), user.getId());
                return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, response, "Token has been refreshed!");
            }
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "Could not verify token!");
        } catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "Could not process request!");
        }
    }

    @PostMapping
    public ResponseWrapper<AuthResponse> createAuthenticationToken(@RequestBody JsonNode authenticationRequest) {
        String username = authenticationRequest.get("username").asText();
        String password = authenticationRequest.get("password").asText();

        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if(passwordEncoder.matches(password, userDetails.getPassword())){
                if(!userDetails.isEnabled()) throw new DisabledException("Account disabled");
                User user = usersService.findUserByUsername(userDetails.getUsername());
                String token = jwtUtils.generateToken(userDetails, user.getRole());
                AuthResponse response = new AuthResponse(token, user.getRole(), user.getId());
                return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, response, "User authenticated successfully!");
            }else{
                throw new BadCredentialsException("Bad Credentials");
            }
        } catch (DisabledException e) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "User has been disabled!");
        } catch (BadCredentialsException e) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "Incorrect credentials provided!");
        } catch (UsernameNotFoundException e) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "Could not find user with the provided username!");
        } catch (Exception e) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "Could not process request!");
        }
    }
}