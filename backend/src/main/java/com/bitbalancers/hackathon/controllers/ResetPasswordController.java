package com.bitbalancers.hackathon.controllers;

import com.bitbalancers.hackathon.db_models.User;
import com.bitbalancers.hackathon.http_models.ResponseWrapper;
import com.bitbalancers.hackathon.services.EmailService;
import com.bitbalancers.hackathon.services.UserPropertyService;
import com.bitbalancers.hackathon.services.UsersService;
import com.bitbalancers.hackathon.util.AuthLevelVerifier;
import com.bitbalancers.hackathon.util.model.MailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import org.apache.tomcat.util.buf.HexUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;

/**
 * @author Arjol Panci (U760154)
 * @since 24-Jun-2022
 */

@RestController
@RequestMapping("/reset")
@CrossOrigin
public class ResetPasswordController {

    @Autowired
    private UsersService usersService;

    @Autowired
    private AuthLevelVerifier authLevelVerifier;

    @Autowired
    private UserPropertyService propertyService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/generate")
    public ResponseWrapper<String> sendResetRequest(@RequestBody JsonNode request) {
        try {
            String userEmail = request.get("email").asText();
            User user = usersService.findByEmail(userEmail);
            byte[] array = new byte[2];
            SecureRandom random = new SecureRandom();
            random.nextBytes(array);
            String generatedString = new String(array, StandardCharsets.UTF_8);
            generatedString = HexUtils.toHexString(generatedString.getBytes(StandardCharsets.UTF_8));
            propertyService.savePropertyForUser("resetKey", generatedString, user);
            MailRequest mrq = new MailRequest(userEmail, "Reset Password",
                    "BitBalancers", "They key for your password reset request is: " + generatedString);
            emailService.sendEmail(mrq);
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "An email has been set to the account with the next steps!");
        } catch (Exception e) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, e.getMessage());
        }
    }

    @PostMapping("/validate")
    public ResponseWrapper<String> checkResetKey(@RequestBody JsonNode requestBody) {
        String email = requestBody.get("email").asText();
        String resetKey = requestBody.get("resetKey").asText();
        try {
            User user = usersService.findByEmail(email);
            if(propertyService.getPropertyForUser("resetKey", user).equals(resetKey)) {
                return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Password reset key is correct!");
            }
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "Password reset key does not match!");
        } catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "Password reset key does not match!");
        }
    }

    @PostMapping("/update")
    public ResponseWrapper<String> updatePasswordReset(@RequestBody JsonNode updateRequest) {
        String email = updateRequest.get("email").asText();
        String newPassword = updateRequest.get("newPassword").asText();
        String confirmNewPassword=  updateRequest.get("confirmNewPassword").asText();
        String key = updateRequest.get("resetKey").asText();
        if(newPassword.equals(confirmNewPassword)) {
            try {
                User user = usersService.findByEmail(email);
                if(propertyService.getPropertyForUser("resetKey", user).equals(key)){
                    user.setPassword(passwordEncoder.encode(newPassword));
                    usersService.updateUser(user);
                    propertyService.savePropertyForUser("resetKey", "-1", user);
                    return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Password has been reset!");
                }else{
                    return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "Reset key is invalid!");
                }
            } catch (Exception e) {
                return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, e.getMessage());
            }
        }
        return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "Password confirmation does not match!");
    }

    @PostMapping("/{user-id}/update")
    public ResponseWrapper<String> updatePasswordForLoggedInUser(@RequestHeader("Authorization") String authHeader,
                                                                 @PathVariable(value = "user-id") Long userId,
                                                                 @RequestBody JsonNode updateRequest) {
        String currentPassword = updateRequest.get("oldPassword").asText();
        String newPassword = updateRequest.get("newPassword").asText();
        String confirmNewPassword=  updateRequest.get("confirmPassword").asText();
        if(newPassword.equals(confirmNewPassword)) {
            try {
                authLevelVerifier.verifyLevel(authHeader, "normal", userId);
                User user = usersService.findByid(userId);
                if(passwordEncoder.matches(currentPassword, user.getPassword())) {
                    user.setPassword(passwordEncoder.encode(newPassword));
                    usersService.updateUser(user);
                    return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Password has been reset!");
                }
                return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "The current password is wrong!");
            } catch (Exception e) {
                return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, e.getMessage());
            }
        }
        return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "Password confirmation does not match!");
    }

}
