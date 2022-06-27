package com.eshop.restcontroller;

import com.eshop.dto.OrderRequest;
import com.eshop.entity.Order;
import com.eshop.entity.OrderDetail;
import com.eshop.dao.OrderDAO;;
import com.eshop.dao.OrderDetailDAO;
import com.eshop.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/order")
public class OrderRestController {

    @Autowired
    OrderDAO orderDao;

    @Autowired
    OrderDetailDAO orderDetailDAO;

    @PostMapping("checkout")
    public ResponseEntity<Order> checkout(@RequestBody OrderRequest orderRequest){
        Order newOrder = new Order();
        User user = new User();
        user.setUsername(orderRequest.getUsername());
        newOrder.setUser(user);
        newOrder.setPhonenumber(orderRequest.getPhonenumber());
        newOrder.setStatus(orderRequest.getStatus());
        newOrder.setOrderDetails(orderRequest.getOrderDetails());

        Order responseOrder = orderDao.save(newOrder);
        Order orderForDetail = new Order();
        orderForDetail.setId(responseOrder.getId());
        Set<OrderDetail> orderDetails = orderRequest.getOrderDetails();
        orderDetails.forEach(detail -> {
            detail.setOrder(orderForDetail);
            orderDetailDAO.save(detail);
        });
        System.out.println(orderDetails.size());
        return ResponseEntity.ok(responseOrder);
    }
//    @GetMapping("/search/{query}")
//    public ResponseEntity<List<Order>> findByQuery(@RequestBody Order order){
//        System.out.println("goi vao quy trinh tim kiem boi query");
//        if(order == null){
//            System.out.println("du lieu truyen vao bi trong");
//            return ResponseEntity.notFound().build();
//        }
//        orderDao.
//    }
//    @GetMapping("/luugiohang")
//    public ResponseEntity<Order> get()
}

