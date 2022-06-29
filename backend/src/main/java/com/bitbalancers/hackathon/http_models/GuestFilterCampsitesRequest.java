package com.bitbalancers.hackathon.http_models;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class GuestFilterCampsitesRequest {
    private LocalDate startDate;
    private LocalDate endDate;
    private Double longitude;
    private Double latitude;
    private Integer startPrice;
    private Integer endPrice;
}
