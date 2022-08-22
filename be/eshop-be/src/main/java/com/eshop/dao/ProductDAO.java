package com.eshop.dao;

import com.eshop.entity.Category;
import com.eshop.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductDAO extends JpaRepository<Product, Integer> {

    @Query(
            value = "Select top 5 * from Products p order by createdate desc",
            nativeQuery = true
    )
    List<Product> findNewCreateProduct();
   // @Query("select p from Product p order by p.createdate desc ")


    Page<Product> findAllByOrderByCreatedateDesc(Pageable pageable);
    Page<Product> findByCategory_Id(Integer id ,Pageable pageable);
    List<Product> findByPriceBetween(Double price,Double price2,Pageable pageable);
    List<Product> findByCategory_IdAndAndPriceBetween(Integer id ,Double min ,Double max,Pageable pageable);

}
