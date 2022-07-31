package com.eshop.dao;

import com.eshop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductDAO extends JpaRepository<Product, Integer> {

    @Query(
            value = "Select top 5 * from Products p order by createdate desc",
            nativeQuery = true
    )
    List<Product> findNewCreateProduct();
}
