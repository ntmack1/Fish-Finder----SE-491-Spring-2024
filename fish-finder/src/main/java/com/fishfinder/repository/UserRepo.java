package com.fishfinder.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.fishfinder.domain.User;

@RepositoryRestResource
public interface UserRepo extends JpaRepository<User, UUID> {
    Optional<User> findByUserName(String userName);
}
