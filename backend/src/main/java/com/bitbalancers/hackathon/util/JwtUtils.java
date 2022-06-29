package com.bitbalancers.hackathon.util;

import com.bitbalancers.hackathon.db_models.User;
import com.bitbalancers.hackathon.services.UsersService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtils implements Serializable {

    public static final long TOKEN_LIFESPAN = 2 * 60 * 60;

    @Autowired
    private UsersService usersService;

    @Value("${jwt.secret}")
    private String secretKey;

    private Claims getTokenClaims(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    public String generateToken(UserDetails userDetails, String role){
        Map<String, Object> claims = new HashMap<>();
        String username = userDetails.getUsername();
        String subject = username + ":" + role;
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_LIFESPAN * 1000))
                .signWith(SignatureAlgorithm.HS512, secretKey).compact();
    }

    public User getUserObjectFromToken(String token) throws Exception {
        Claims claims = getTokenClaims(token);
        String subject = claims.getSubject();
        String username = subject.split(":")[0];
        return usersService.findUserByUsername(username);
    }

    public String getUserFromToken(String token){
        Claims claims = getTokenClaims(token);
        String subject = claims.getSubject();
        return subject.split(":")[0];
    }

    public String getRoleFromToken(String token){
        Claims claims = getTokenClaims(token);
        String subject = claims.getSubject();
        return subject.split(":")[1];
    }

    private Boolean isExpired(String token){
        Claims claims = getTokenClaims(token);
        Date expirationDate = claims.getExpiration();
        return expirationDate.before(new Date());
    }

    public Boolean isValid(String token, UserDetails userDetails){
        String username = getUserFromToken(token);
        return (!isExpired(token) && username.equals(userDetails.getUsername()));
    }

}
