package com.bitbalancers.hackathon.db_models;

import lombok.Data;

import javax.persistence.*;

/**
 * @author Arjol Panci (U760154)
 * @since 24-Jun-2022
 */

@Entity
@Data
public class CampsiteAmenities {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column private String description;

    @ManyToOne
    private Campsite campsite;
}
