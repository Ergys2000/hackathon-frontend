package com.bitbalancers.hackathon.db_models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column private String username;
    @Column private String email;
    @Column private String password;
    @Column private String role;
    @Column private String city;
    @Column private String state;
    @Column private String address;
    @Column private String longitude;
    @Column private String latitude;

}
