package com.eshop.dao;

import com.eshop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDAO extends JpaRepository<User, String> {
    Boolean existsByEmail(String email);
}
