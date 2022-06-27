package com.eshop.dao;

import com.eshop.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartDAO  extends JpaRepository<Cart, Integer> {

        @Query("select c from Cart c")
        Cart getcard();
        }

//        @Query("select c From ")

