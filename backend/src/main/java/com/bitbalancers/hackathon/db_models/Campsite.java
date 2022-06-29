package com.bitbalancers.hackathon.db_models;

import lombok.Data;

import javax.persistence.*;

/**
 * @author Arjol Panci (U760154)
 * @since 24-Jun-2022
 */

@Entity
@Data
public class Campsite {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column private String name;
    @Column private String description;
    @Column private Double longitude;
    @Column private Double latitude;
    @Column private int capacity;
    @Column private Double price;

    @ManyToOne
    private User user;
}
