package com.bitbalancers.hackathon.services;

import com.bitbalancers.hackathon.db_models.Reservation;
import com.bitbalancers.hackathon.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getReservationsForUser(Long guestId) {
        return reservationRepository.findReservationsByGuestId(guestId);
    }

    public Reservation getReservationById(Long reservationId) throws Exception {
        Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);
        if(!optionalReservation.isPresent()) {
            throw new Exception("Could not fetch the requested reservation!");
        }
        return optionalReservation.get();
    }

    public void deleteReservation(Reservation reservation) {
        reservationRepository.delete(reservation);
    }

    public void saveOrUpdate(Reservation reservation) {
        reservationRepository.save(reservation);
    }

}
