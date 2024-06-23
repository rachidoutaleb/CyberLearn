package com.kumar.blogapi.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<UserEntity, Integer> {
    UserEntity findByEmail(String email);
    Optional<UserEntity> findByUserName(String userName);
}

