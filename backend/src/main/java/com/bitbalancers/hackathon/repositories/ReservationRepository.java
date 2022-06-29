package com.bitbalancers.hackathon.repositories;

import com.bitbalancers.hackathon.db_models.Campsite;
import com.bitbalancers.hackathon.db_models.Reservation;
import com.bitbalancers.hackathon.db_models.User;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ReservationRepository extends PagingAndSortingRepository<Reservation, Long> {
    List<Reservation> findReservationsByGuestId(Long guestId);
}
