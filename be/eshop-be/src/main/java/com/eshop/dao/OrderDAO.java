package com.eshop.dao;

import com.eshop.entity.Adress;
import com.eshop.entity.User;
import com.eshop.entity.Order;
import com.eshop.entity.OrderDetail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Set;

public interface OrderDAO extends JpaRepository<Order, Long> {

    @Query("Select o.user from Order o WHERE o.id = 1")
    User find1User();

    @Query("Select o.adress from Order o WHERE o.id = 1")
    Adress find1Adress();

    @Query("Select o.orderStatus from Order o WHERE o.id = 1")
    Integer find1Stt();

    @Query("Select o.createdate from Order o WHERE o.id = 1")
    Date find1Crd();

    @Query("Select o.orderDetails from Order o WHERE o.id = 1")
    Set<OrderDetail> find1Oddt();

    @Query("Select o from Order o Where o.user.username = ?1")
    List<Order> findByUsername(String username);


    Boolean existsByUserAndId(User user, Long id);


}
