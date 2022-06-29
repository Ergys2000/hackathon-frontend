package com.bitbalancers.hackathon.util;

import com.bitbalancers.hackathon.db_models.User;
import com.bitbalancers.hackathon.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AuthLevelVerifier {

    @Autowired
    private UsersService usersService;

    @Autowired
    private JwtUtils jwtUtils;

    public User verifyLevel(String authHeader, String role, Long userId) throws Exception {
        String token = authHeader.split(" ")[1];
        if(jwtUtils.getRoleFromToken(token).equals("admin")) {
            return jwtUtils.getUserObjectFromToken(token);
        }
        verifyTokenAuthLevel(token, role);
        User user = usersService.findByid(userId);
        verifyAccountMatch(token, user);
        return user;
    }

    public void verifyTokenAuthLevel(String token, String role) throws InsufficientAccessException{
        String tokenRole = jwtUtils.getRoleFromToken(token);
        if(!tokenRole.equals("admin") && !tokenRole.equals(role)) {
            if(role.equals("normal") && (tokenRole.equals("host") || tokenRole.equals("guest"))) return;
            throw new InsufficientAccessException("You do not have access to perform this request!");
        }
    }

    public void verifyAccountMatch(String token, User user) throws InsufficientAccessException{
        String tokenUser = jwtUtils.getUserFromToken(token);
        if(!tokenUser.equals(user.getUsername())) {
           throw new InsufficientAccessException("You have no access in this user's data!");
        }
    }
}
