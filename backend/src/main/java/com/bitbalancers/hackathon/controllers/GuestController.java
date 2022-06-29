package com.bitbalancers.hackathon.controllers;

import com.bitbalancers.hackathon.db_models.Campsite;
import com.bitbalancers.hackathon.db_models.Reservation;
import com.bitbalancers.hackathon.db_models.User;
import com.bitbalancers.hackathon.http_models.GuestFilterCampsitesRequest;
import com.bitbalancers.hackathon.http_models.ResponseWrapper;
import com.bitbalancers.hackathon.services.CampsiteService;
import com.bitbalancers.hackathon.services.GuestService;
import com.bitbalancers.hackathon.services.ReservationService;
import com.bitbalancers.hackathon.services.UsersService;
import com.bitbalancers.hackathon.util.AuthLevelVerifier;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/guest/{userId}")
public class GuestController {
    @Autowired
    private AuthLevelVerifier authLevelVerifier;

    @Autowired
    private UsersService usersService;

    @Autowired
    private GuestService guestService;

    @Autowired
    private CampsiteService campsiteService;

    @Autowired
    private ReservationService reservationService;

    @GetMapping
    public ResponseWrapper<User> getGuestData(@RequestHeader("Authorization") String authHeader, @PathVariable(value="userId") Long guestId) {
        try {
            authLevelVerifier.verifyLevel(authHeader, "guest", guestId);
            User guest = guestService.getGuestById(guestId);
            guest.setPassword("");
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, guest, "Guest data retrieved successfully!");
        } catch (Exception e) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, e.getMessage());
        }
    }

    @PutMapping()
    public ResponseWrapper<String> updateUser(@RequestHeader("Authorization") String authHeader,
                                              @PathVariable(value = "userId") Long guestId,
                                              @RequestBody User user) {
        try {
            authLevelVerifier.verifyLevel(authHeader, "guest", guestId);
            User currentData = usersService.findByid(guestId);
            user.setPassword(currentData.getPassword());
            user.setRole(currentData.getRole());
            usersService.updateUser(user);
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Guest has been updated");
        }catch (Exception ex) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, ex.getMessage());
        }
    }

    @GetMapping("/campsites")
    public ResponseWrapper<List<Campsite>> getCampSites(@RequestHeader("Authorization") String authHeader, @PathVariable(value="userId") Long guestId) {
        try {
            authLevelVerifier.verifyLevel(authHeader, "guest", guestId);
            List<Campsite> campsites = campsiteService.getAllCampsites();
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, campsites, "Camp sites taken successfully!");
        } catch (Exception e) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, e.getMessage());
        }
    }

    @PostMapping("/reservations")
    public ResponseWrapper<String> createReservation(@RequestHeader("Authorization")String authHeader, @PathVariable(value="userId") Long guestId, @RequestBody JsonNode body) {
        try {
            User user = authLevelVerifier.verifyLevel(authHeader, "guest", guestId);
            Long campsiteId = body.get("campsiteId").asLong();
            int people = body.get("people").asInt();
            Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse(body.get("startDate").asText());
            Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse(body.get("endDate").asText());
            Campsite campsite = campsiteService.getCampsiteById(campsiteId);

            User reservationUser = usersService.findByid(guestId);

            Reservation reservation = new Reservation();
            reservation.setStartDate(startDate);
            reservation.setEndDate(endDate);
            reservation.setCampsite(campsite);
            reservation.setPeople(people);
            reservation.setGuest(reservationUser);

            reservationService.saveOrUpdate(reservation);

            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Reservation added!");
        } catch (Exception e) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, e.getMessage());
        }
    }

    @DeleteMapping("/reservations/{reserv-id}")
    @CrossOrigin
    public ResponseWrapper<String> deleteReservation(@RequestHeader("Authorization")String authHeader,
                                                     @PathVariable(value="userId") Long guestId,
                                                     @PathVariable(value = "reserv-id") Long reservId) {
        try {
            User user = authLevelVerifier.verifyLevel(authHeader, "guest", guestId);
            Reservation reservation = reservationService.getReservationById(reservId);
            if(user.getRole().equals("admin") || reservation.getGuest().getId().equals(user.getId())) {
                reservationService.deleteReservation(reservation);
                return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, null, "Reservation deleted!");
            }
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, "Unauthorized request!");
        } catch (Exception e) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, e.getMessage());
        }
    }

    // filter camp sites by price range, date range, location
    @PostMapping("/filter")
    public ResponseWrapper<List<Campsite>> filterCampSites(@RequestHeader("Authorization")String authHeader, @PathVariable(value="userId") Long guestId, @RequestBody GuestFilterCampsitesRequest guestFilterCampsitesRequest) {
        try{
            User user = authLevelVerifier.verifyLevel(authHeader, "guest", guestId);
            List<Campsite> campsites = campsiteService.filterCampsitesByDateAndPriceAndLocation(guestFilterCampsitesRequest);
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, campsites, "");
        } catch (Exception e) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, e.getMessage());
        }
    }

    @GetMapping("/reservations")
    public ResponseWrapper<List<Reservation>> getGuestReservations(@RequestHeader("Authorization")String authHeader, @PathVariable(value="userId") Long guestId) {
        try {
            User user = authLevelVerifier.verifyLevel(authHeader, "guest", guestId);
            List<Reservation> reservations = reservationService.getReservationsForUser(guestId);
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.OK, reservations, "Reservations retrieved successfully!");
        } catch(Exception e) {
            return new ResponseWrapper<>(ResponseWrapper.STATUS_MESSAGE.ERROR, null, e.getMessage());
        }
    }
}
