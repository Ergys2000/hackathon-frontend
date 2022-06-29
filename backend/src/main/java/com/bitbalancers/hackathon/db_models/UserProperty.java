package com.bitbalancers.hackathon.db_models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class UserProperty {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column
    private String propertyKey;
    @Column
    private String propertyValue;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
