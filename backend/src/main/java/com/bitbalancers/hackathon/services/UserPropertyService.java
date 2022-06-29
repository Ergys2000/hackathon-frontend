package com.bitbalancers.hackathon.services;

import com.bitbalancers.hackathon.db_models.User;
import com.bitbalancers.hackathon.db_models.UserProperty;
import com.bitbalancers.hackathon.repositories.UserPropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserPropertyService {

    @Autowired
    private UserPropertyRepository propertyRepository;

    public String getPropertyForUser(String property_key, User user) throws Exception {
        Optional<String> optProperty = propertyRepository.getPropertyForUser(property_key, user);
        if(optProperty.isPresent()) {
            return optProperty.get();
        }
        throw new Exception("This user does not have a value for the given property key");
    }

    public void savePropertyForUser(String property_key, String property_value, User user) {
        Optional<String> optProperty = propertyRepository.getPropertyForUser(property_key, user);
        if(optProperty.isPresent()) {
            propertyRepository.updateMetaForUser(property_key, property_value, user);
        } else{
            UserProperty newProperty = new UserProperty();
            newProperty.setPropertyKey(property_key);
            newProperty.setPropertyValue(property_value);
            newProperty.setUser(user);
            propertyRepository.save(newProperty);
        }
    }
}
