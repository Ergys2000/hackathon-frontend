package com.bitbalancers.hackathon.security;

import com.bitbalancers.hackathon.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersService usersService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            return new JwtUserDetails(usersService.findUserByUsername(username));
        } catch (Exception e) {
            throw new UsernameNotFoundException("User " + username + " not found!");
        }
    }
}
