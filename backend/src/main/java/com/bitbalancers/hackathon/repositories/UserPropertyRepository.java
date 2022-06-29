package com.bitbalancers.hackathon.repositories;

import com.bitbalancers.hackathon.db_models.User;
import com.bitbalancers.hackathon.db_models.UserProperty;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import javax.transaction.Transactional;
import java.util.Optional;

public interface UserPropertyRepository extends PagingAndSortingRepository<UserProperty, Long> {

    @Query("SELECT up.propertyValue FROM UserProperty up WHERE up.propertyKey=?1 AND up.user=?2")
    Optional<String> getPropertyForUser(String property_key, User user);

    @Transactional
    @Modifying
    @Query("UPDATE UserProperty up set up.propertyValue=?2 WHERE up.propertyKey=?1 AND up.user=?3")
    void updateMetaForUser(String property_key, String property_value, User user);
}
