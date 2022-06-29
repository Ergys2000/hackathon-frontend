package com.bitbalancers.hackathon.services;

import com.bitbalancers.hackathon.db_models.Campsite;
import com.bitbalancers.hackathon.db_models.User;
import com.bitbalancers.hackathon.repositories.CampsiteRepository;
import com.bitbalancers.hackathon.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Arjol Panci (U760154)
 * @since 24-Jun-2022
 */

@Service
public class GuestService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllGuests() {
        List<User> allHosts = userRepository.findAllByRole("guest");
        return allHosts;
    }

    public User getGuestById(Long id) throws Exception {
        Optional<User> optionalGuest = userRepository.findByRoleAndId("guest", id);
        if(optionalGuest.isPresent()) {
            return optionalGuest.get();
        }
        throw new Exception("There is no guest with the given id!");
    }

}
