package com.bitbalancers.hackathon;

import com.bitbalancers.hackathon.db_models.User;
import com.bitbalancers.hackathon.services.UsersService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@Slf4j
public class HackathonApplication implements CommandLineRunner {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UsersService usersService;

    public static void main(String[] args) {
        SpringApplication.run(HackathonApplication.class, args);
    }

    @Override
    public void run(String... args) {
        try {
            usersService.findByEmail("admin@admin.com");
            log.info("There is already an admin user in the database!");
        } catch (Exception ex) {
            User user = new User();
            user.setUsername("admin");
            user.setPassword(passwordEncoder.encode("admin"));
            user.setRole("admin");
            user.setEmail("admin@admin.com");
            usersService.saveUser(user);
            log.info("Admin user created!");
        }
    }
}
