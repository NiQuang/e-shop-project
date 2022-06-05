package com.eshop.dao;

import com.eshop.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleDAO extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String name);
}
