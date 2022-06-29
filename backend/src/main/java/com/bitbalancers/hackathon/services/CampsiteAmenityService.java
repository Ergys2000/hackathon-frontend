package com.bitbalancers.hackathon.services;

import com.bitbalancers.hackathon.db_models.CampsiteAmenities;
import com.bitbalancers.hackathon.repositories.CampsiteAmenityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Arjol Panci (U760154)
 * @since 25-Jun-2022
 */

@Service
public class CampsiteAmenityService {

    @Autowired
    private CampsiteAmenityRepository campsiteAmenityRepository;

    public CampsiteAmenities getById(Long amenityId) throws Exception {
        Optional<CampsiteAmenities> optionalAmenity = campsiteAmenityRepository.findById(amenityId);
        if(!optionalAmenity.isPresent()) {
            throw new Exception("Could not fetch amenity");
        }
        return optionalAmenity.get();
    }

    public List<CampsiteAmenities> getByCampsiteId(Long campsiteId) throws Exception {
        List<CampsiteAmenities> allAmenities = campsiteAmenityRepository.findAllByCampsiteId(campsiteId);
        if(allAmenities.size() == 0) {
            throw new Exception("No amenities for the campsite");
        }
        return allAmenities;
    }

    public void saveOrUpdate(CampsiteAmenities campsiteAmenity) {
        campsiteAmenityRepository.save(campsiteAmenity);
    }

    public void delete(CampsiteAmenities campsiteAmenity) {
        campsiteAmenityRepository.delete(campsiteAmenity);
    }

}
