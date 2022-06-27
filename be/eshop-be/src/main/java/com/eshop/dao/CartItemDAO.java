package com.eshop.dao;

import com.eshop.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartItemDAO extends JpaRepository<CartItem, Long> {
    @Query(
           value = "Select * from cartitems c where c.username = ?1 and c.productid = ?2",
            nativeQuery = true
    )
    CartItem findByUsernameAndProductId(String username, Integer productid);

}