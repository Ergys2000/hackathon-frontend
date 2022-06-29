package com.bitbalancers.hackathon.repositories;

import com.bitbalancers.hackathon.db_models.CampsiteAmenities;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface CampsiteAmenityRepository extends PagingAndSortingRepository<CampsiteAmenities, Long> {

    List<CampsiteAmenities> findAllByCampsiteId(Long campsiteId);

}
