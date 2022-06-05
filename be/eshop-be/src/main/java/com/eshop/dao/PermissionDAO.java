package com.eshop.dao;

import com.eshop.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PermissionDAO extends JpaRepository<Permission, Integer> {


}
