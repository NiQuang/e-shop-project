package com.eshop.dao;

import com.eshop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderDAO extends JpaRepository<Order, Long> {

//    @Query("select * from c ")
}
