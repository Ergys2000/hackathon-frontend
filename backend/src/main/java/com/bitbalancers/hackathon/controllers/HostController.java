package com.bitbalancers.hackathon.controllers;

import com.bitbalancers.hackathon.db_models.Campsite;
import com.bitbalancers.hackathon.db_models.User;
import com.bitbalancers.hackathon.http_models.ResponseWrapper;
import com.bitbalancers.hackathon.services.HostService;
import com.bitbalancers.hackathon.services.UsersService;
import com.bitbalancers.hackathon.util.AuthLevelVerifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Arjol Panci (U760154)
 * @since 25-Jun-2022
 */

@RestController
@CrossOrigin
@RequestMapping("/host")
public class HostController {

    @Autowired
    private HostService hostService;

    @Autowired
    private UsersService userService;

    @Autowired
    private AuthLevelVerifier authLevelVerifier;

    @GetMapping("/{id}")
    public ResponseWrapper<User> getHost(@RequestHeader("Authorization") String authHeader,
                   @PathVariable(value = "id") Long hostId) {
        try {
            authLevelVerifier.verifyLevel(authHeader, "host", hostId);
            User host = hostService.getHostById(hostId);
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, host, "Host data has been retrieved!");
        } catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

    @GetMapping("/{id}/campsites")
    public ResponseWrapper<List<Campsite>> getCampsitesForHost(@RequestHeader("Authorization") String authHeader,
                                         @PathVariable(value = "id") Long hostId) {
        try {
            authLevelVerifier.verifyLevel(authHeader, "host", hostId);
            User host = hostService.getHostById(hostId);
            List<Campsite> campsiteList = hostService.getCampsitesForHost(host);
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, campsiteList, "Host campsites have been retrieved!");
        } catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseWrapper<String> updateUser(@RequestHeader("Authorization") String authHeader,
                                              @PathVariable(value = "id") Long hostId,
                                              @RequestBody User user) {
        try {
            authLevelVerifier.verifyLevel(authHeader, "host", hostId);
            User currentData = userService.findByid(hostId);
            user.setPassword(currentData.getPassword());
            user.setRole(currentData.getRole());
            userService.updateUser(user);
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Host has been saved");
        }catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseWrapper<String> deleteUser(@RequestHeader("Authorization") String authHeader,
                                              @PathVariable(value = "id") Long hostId,
                                              @RequestBody User user) {
        try {
            authLevelVerifier.verifyLevel(authHeader, "host", hostId);
            userService.delete(user);
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Host has been deleted");
        }catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }
}
