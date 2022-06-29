package com.bitbalancers.hackathon.repositories;

import com.bitbalancers.hackathon.db_models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends PagingAndSortingRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findById(Long id);

    Optional<User> findByRoleAndId(String role, Long id);
    List<User> findAllByRole(String role);


    @Query(value = "SELECT * FROM USER WHERE role=?1 AND concat(username, email) LIKE ?2",
            countQuery = "SELECT count(*) FROM USER WHERE role=?1 AND concat(username, email) LIKE ?2",
            nativeQuery = true)
    Page<User> findByRole(String role, String searchTerm, Pageable pageable);
}
