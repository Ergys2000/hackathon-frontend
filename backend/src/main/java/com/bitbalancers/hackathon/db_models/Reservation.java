package com.bitbalancers.hackathon.db_models;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

/**
 * @author Arjol Panci (U760154)
 * @since 24-Jun-2022
 */

@Entity
@Data
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column private Date startDate;
    @Column private Date endDate;
    @Column private int people;

    @ManyToOne
    private Campsite campsite;

    @ManyToOne
    private User guest;
}
