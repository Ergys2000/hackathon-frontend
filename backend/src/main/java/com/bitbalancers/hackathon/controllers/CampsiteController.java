package com.bitbalancers.hackathon.controllers;

import com.bitbalancers.hackathon.db_models.Campsite;
import com.bitbalancers.hackathon.db_models.CampsiteAmenities;
import com.bitbalancers.hackathon.db_models.User;
import com.bitbalancers.hackathon.http_models.ResponseWrapper;
import com.bitbalancers.hackathon.services.CampsiteAmenityService;
import com.bitbalancers.hackathon.services.CampsiteService;
import com.bitbalancers.hackathon.services.UsersService;
import com.bitbalancers.hackathon.util.AuthLevelVerifier;
import com.bitbalancers.hackathon.util.JwtUtils;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Arjol Panci (U760154)
 * @since 24-Jun-2022
 */

@RestController
@CrossOrigin
@RequestMapping("/campsite")
public class CampsiteController {

    @Autowired
    private AuthLevelVerifier authLevelVerifier;

    @Autowired
    private UsersService usersService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private CampsiteAmenityService campsiteAmenityService;

    @Autowired
    private CampsiteService campsiteService;

    @PostMapping("/search")
    public ResponseWrapper<List<Campsite>> getCampsitesByKeyword(@RequestHeader("Authorization") String authHeader,
                                                                 @RequestBody JsonNode requestBody,
                                                                 @PathVariable(value="id") Long campsiteId) {
        try {
            String token = authHeader.split(" ")[1];
            authLevelVerifier.verifyTokenAuthLevel(token, "host");
            User authenticatedUser = jwtUtils.getUserObjectFromToken(token);
            String searchTerm = requestBody.get("searchTerm").asText();
            List<Campsite> campsites;
            if(authenticatedUser.getRole().equals("admin")) {
                campsites = campsiteService.getCampsitesBySearchKeyword(searchTerm);
                return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, campsites, "Campsites have been retrieved!");
            }else if(authenticatedUser.getRole().equals("host")) {
                campsites = campsiteService.getCampsitesBySearchKeyword(searchTerm, authenticatedUser.getId());
                return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, campsites, "Campsites have been retrieved!");
            }
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Unauthorized request!");
        } catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

    @GetMapping
    public ResponseWrapper<List<Campsite>> getAllCampsites(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.split(" ")[1];
            authLevelVerifier.verifyTokenAuthLevel(token, "normal");
            List<Campsite> campsites = campsiteService.getAllCampsites();
            if(campsites.size() > 0) {
                return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, campsites, "Campsites have been retrieved!");
            }
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "There are no campsites!");
        } catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

    @GetMapping("/{campId}")
    public ResponseWrapper<Campsite> getCampsiteById(@RequestHeader("Authorization") String authHeader,
                                                           @PathVariable(value = "campId") Long campsiteId) {
        try {
            String token = authHeader.split(" ")[1];
            authLevelVerifier.verifyTokenAuthLevel(token, "normal");
            Campsite campsite = campsiteService.getCampsiteById(campsiteId);
            campsite.setUser(null);
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, campsite, "Campsite has been retrieved!");
        } catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

    @PostMapping("/{host-id}")
    public ResponseWrapper<String> createCampsite(@RequestHeader("Authorization") String authHeader,
                                                  @PathVariable(value = "host-id") Long hostId,
                                                  @RequestBody Campsite campsite) {
        try {
            authLevelVerifier.verifyLevel(authHeader, "host", hostId);
            User host = usersService.findByid(hostId);
            campsite.setUser(host);
            campsiteService.saveOrUpdate(campsite);
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Campsite has been saved");
        }catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

    @PutMapping("/{host-id}/{campsite-id}")
    public ResponseWrapper<String> updateCampsite(@RequestHeader("Authorization") String authHeader,
                                                  @PathVariable(value = "host-id") Long hostId,
                                                  @PathVariable(value = "campsite-id") Long campsiteId,
                                                  @RequestBody Campsite campsite) {
        try {
            User authenticatedUser = authLevelVerifier.verifyLevel(authHeader, "host", hostId);
            Campsite currentData = campsiteService.getCampsiteById(campsiteId);
            campsite.setUser(currentData.getUser());
            if(authenticatedUser.getRole().equals("admin") || authenticatedUser.getId().equals(campsite.getUser().getId())) {
                campsiteService.saveOrUpdate(campsite);
                return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Campsite has been saved");
            }

            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Campsite has been saved");
        }catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseWrapper<String> deleteCampsite(@RequestHeader("Authorization") String authHeader,
                                                  @PathVariable(value="id") Long campsiteId) {
        try {
            Campsite campsite = campsiteService.getById(campsiteId);
            User campsiteUser = campsite.getUser();
            User authenticatedUser = authLevelVerifier.verifyLevel(authHeader, "host", campsiteUser.getId());
            if(authenticatedUser.getRole().equals("admin") || authenticatedUser.getId().equals(campsiteUser.getId())) {
                campsiteService.delete(campsite);
            }
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Campsite has been deleted!");
        } catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

    @GetMapping("/{id}/amenities")
    public ResponseWrapper<List<CampsiteAmenities>> getAmenitiesForCampsite(@RequestHeader("Authorization") String authHeader,
                                              @PathVariable(value="id") Long campsiteId) {
        try {
            String token = authHeader.split(" ")[1];
            Campsite campsite = campsiteService.getById(campsiteId);
            authLevelVerifier.verifyTokenAuthLevel(token, "normal");
            List<CampsiteAmenities> amenities = campsiteAmenityService.getByCampsiteId(campsiteId);
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, amenities, "Amenities have been fetched successfully!");
        } catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

    @PostMapping("/{id}/amenities")
    public ResponseWrapper<String> addAmenity(@RequestHeader("Authorization") String authHeader,
                                              @RequestBody CampsiteAmenities amenity,
                                              @PathVariable(value="id") Long campsiteId) {
        try {
            Campsite campsite = campsiteService.getById(campsiteId);
            User campsiteUser = campsite.getUser();
            User authenticatedUser = authLevelVerifier.verifyLevel(authHeader, "host", campsiteUser.getId());
            if(authenticatedUser.getRole().equals("admin") || authenticatedUser.getId().equals(campsiteUser.getId())) {
                amenity.setCampsite(campsite);
                campsiteAmenityService.saveOrUpdate(amenity);
            }
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Campsite amenity has been added!");
        } catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

    @PutMapping("/{id}/amenities/{amenityId}")
    public ResponseWrapper<String> updateAmenity(@RequestHeader("Authorization") String authHeader,
                                              @RequestBody CampsiteAmenities amenity,
                                              @PathVariable(value="id") Long campsiteId,
                                                 @PathVariable(value="amenityId") Long amenityId) {
        try {
            Campsite campsite = campsiteService.getById(campsiteId);
            User campsiteUser = campsite.getUser();
            User authenticatedUser = authLevelVerifier.verifyLevel(authHeader, "host", campsiteUser.getId());
            if(amenityId == amenity.getId() && (
                    authenticatedUser.getRole().equals("admin") || authenticatedUser.getId().equals(campsiteUser.getId()))) {
                campsiteAmenityService.saveOrUpdate(amenity);
            }
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Campsite amenity has been updated!");
        } catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

    @DeleteMapping("/{id}/amenities/{amenityId}")
    public ResponseWrapper<String> deleteAmenity(@RequestHeader("Authorization") String authHeader,
                                                @PathVariable(value = "amenityId") Long amenityId,
                                                 @PathVariable(value="id") Long campsiteId) {
        try {
            Campsite campsite = campsiteService.getById(campsiteId);
            CampsiteAmenities amenity = campsiteAmenityService.getById(amenityId);
            User campsiteUser = campsite.getUser();
            User authenticatedUser = authLevelVerifier.verifyLevel(authHeader, "host", campsiteUser.getId());
            if(authenticatedUser.getRole().equals("admin") || authenticatedUser.getId().equals(campsiteUser.getId())) {
                campsiteAmenityService.delete(amenity);
            }
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Campsite amenity has been deleted!");
        } catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

}
