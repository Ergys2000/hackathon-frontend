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
public class HostService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CampsiteRepository campsiteRepository;

    public List<User> getAllHosts() {
        List<User> allHosts = userRepository.findAllByRole("host");
        return allHosts;
    }

    public List<Campsite> getCampsitesForHost(User user) throws Exception {
        List<Campsite> allCampsites = campsiteRepository.findAllByUserId(user.getId());
        if(allCampsites.size() == 0) {
            throw new Exception("There are no campsites for this host!");
        }
        return allCampsites;
    }

    public User getHostById(Long id) throws Exception {
        Optional<User> optionalHost = userRepository.findByRoleAndId("host", id);
        if(optionalHost.isPresent()) {
            return optionalHost.get();
        }
        throw new Exception("There is no host with the given id!");
    }

}
