package com.bitbalancers.hackathon.repositories;

import com.bitbalancers.hackathon.db_models.Campsite;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.time.LocalDate;
import java.util.List;

public interface CampsiteRepository extends PagingAndSortingRepository<Campsite, Long> {

    List<Campsite> findAllByUserId(Long userId);

    @Query(value = "select * from campsite c where c.id not IN (" +
            "select c.id from campsite c inner join reservation r on c.id=r.campsite_id " +
            "where r.end_date >= ?1 and r.end_date <= ?2 or r.start_date >= ?1 and r.start_date <= ?2)", nativeQuery = true)
    List<Campsite> findCampsiteWithNoReservationInInterval(LocalDate startDate, LocalDate endDate);

    @Query(value="SELECT * FROM campsite WHERE concat(description, name) LIKE ?1", nativeQuery = true)
    List<Campsite> findCampsitesFromKeyword(String keyword);

    @Query(value="SELECT * FROM campsite WHERE user_id=?2 AND concat(description, name) LIKE ?1", nativeQuery = true)
    List<Campsite> findCampsitesFromKeywordForHost(String keyword, Long hostId);
}
