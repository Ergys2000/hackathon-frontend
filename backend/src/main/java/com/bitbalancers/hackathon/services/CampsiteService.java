package com.bitbalancers.hackathon.services;

import com.bitbalancers.hackathon.db_models.Campsite;
import com.bitbalancers.hackathon.http_models.GuestFilterCampsitesRequest;
import com.bitbalancers.hackathon.repositories.CampsiteRepository;
import com.bitbalancers.hackathon.util.UtilFunctions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author Arjol Panci (U760154)
 * @since 24-Jun-2022
 */

@Service
public class CampsiteService {

    @Autowired
    private CampsiteRepository campsiteRepository;

    public Campsite getCampsiteById(Long id) throws Exception {
        Optional<Campsite> optionalCampsite =  campsiteRepository.findById(id);
        if(!optionalCampsite.isPresent()) {
            throw new Exception("This campsite is not present!");
        }
        return optionalCampsite.get();
    }
    public List<Campsite> getAllCampsites() {
        List<Campsite> allCampsites = new ArrayList<>();
        campsiteRepository.findAll().forEach(allCampsites::add);
        return allCampsites;
    }

    public List<Campsite> getCampsitesBySearchKeyword(String searchTerm) throws Exception {
        List<Campsite> foundCampsites = campsiteRepository.findCampsitesFromKeyword(searchTerm);
        if(foundCampsites.size() > 0) {
            throw new Exception("No campsites found with the given keyword!");
        }
        return foundCampsites;
    }

    public List<Campsite> getCampsitesBySearchKeyword(String searchTerm, Long hostId) throws Exception {
        List<Campsite> foundCampsites = campsiteRepository.findCampsitesFromKeywordForHost(searchTerm, hostId);
        if(foundCampsites.size() > 0) {
            throw new Exception("No campsites found with the given keyword for this host!");
        }
        return foundCampsites;
    }

    public List<Campsite> filterCampsitesByDateAndPriceAndLocation(GuestFilterCampsitesRequest guestFilterCampsitesRequest) {
        LocalDate startDate = guestFilterCampsitesRequest.getStartDate();
        LocalDate endDate = guestFilterCampsitesRequest.getEndDate();
        Double longitude = guestFilterCampsitesRequest.getLongitude();
        Double latitude = guestFilterCampsitesRequest.getLatitude();
        Integer priceStart = guestFilterCampsitesRequest.getStartPrice();
        Integer priceEnd  = guestFilterCampsitesRequest.getEndPrice();
        System.out.println("object: " + guestFilterCampsitesRequest.toString());

        return campsiteRepository.findCampsiteWithNoReservationInInterval(startDate, endDate)
                .stream()
                // make sure all the campsites have the right price
                .filter(campsite ->
                        campsite.getPrice() >= priceStart
                        && campsite.getPrice() <= priceEnd)
                // sort them by distance from location
                .sorted((c1, c2) -> {
                    Double d1 = UtilFunctions.distance(latitude, c1.getLatitude(), longitude, c1.getLongitude());
                    Double d2 = UtilFunctions.distance(latitude, c2.getLatitude(), longitude, c2.getLongitude());
                    return d2.compareTo(d1);
                })
                .collect(Collectors.toList());
    }

    public Campsite getById(Long id) throws Exception {
        Optional<Campsite> optionalCampsite = campsiteRepository.findById(id);
        if(optionalCampsite.isPresent()) {
            return optionalCampsite.get();
        }
        throw new Exception("Sorry that campsite already exists!");
    }

    public void saveOrUpdate(Campsite campsite) {
        campsiteRepository.save(campsite);
    }

    public void delete(Campsite campsite) {
        campsiteRepository.delete(campsite);
    }

}
