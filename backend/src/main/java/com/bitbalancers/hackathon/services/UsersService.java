package com.bitbalancers.hackathon.services;

import com.bitbalancers.hackathon.db_models.User;
import com.bitbalancers.hackathon.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsersService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        List<User> allUsers = new ArrayList<>();
        userRepository.findAll().forEach(allUsers::add);
        return allUsers;
    }

    public User findByid(Long id) throws Exception {
        Optional<User> optUser = userRepository.findById(id);
        if(optUser.isPresent()) {
            return optUser.get();
        }
        throw new Exception("There is no user with the given id");
    }

    public User findByEmail(String email) throws Exception {
        Optional<User> optUser = userRepository.findByEmail(email);
        if(optUser.isPresent()) {
            return optUser.get();
        }
        throw new Exception("There is no user with the email: " + email);
    }

    public User findUserByUsername(String username) throws Exception {
        Optional<User> optUser = userRepository.findByUsername(username);
        if(optUser.isPresent()) {
            return optUser.get();
        }
        throw new Exception("User with username " + username + " not found!");
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }

    public void delete(User user) {
        userRepository.delete(user);
    }
}
