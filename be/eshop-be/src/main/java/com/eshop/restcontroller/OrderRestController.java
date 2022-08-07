package com.eshop.restcontroller;

import com.eshop.dto.AdminOrderDTO;
import com.eshop.dto.OrderRequest;
import com.eshop.entity.Adress;
import com.eshop.entity.Order;
import com.eshop.entity.OrderDetail;
import com.eshop.dao.OrderDAO;;
import com.eshop.dao.OrderDetailDAO;
import com.eshop.entity.User;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
        System.out.println(orderRequest);
        Order newOrder = new Order();
        User user = new User();
        user.setUsername(orderRequest.getUsername());
        Adress addr  = new Adress();
        addr.setId(orderRequest.getAdress());
        newOrder.setUser(user);
        newOrder.setAdress(addr);
        newOrder.setOrderStatus(orderRequest.getStatus());
        newOrder.setOrderDetails(orderRequest.getOrderDetails());

        Order responseOrder = orderDao.save(newOrder);
        Order orderForDetail = new Order();
        orderForDetail.setId(responseOrder.getId());
        List<OrderDetail> orderDetails = orderRequest.getOrderDetails();
        orderDetails.forEach(detail -> {
            detail.setOrder(orderForDetail);
            orderDetailDAO.save(detail);
        });
        System.out.println(orderDetails.size());
        return ResponseEntity.ok(responseOrder);
//        return  ResponseEntity.ok(new Order());
    }

    @GetMapping("get-all")
    public ResponseEntity<List<AdminOrderDTO>> getAllOrder(){
        List<AdminOrderDTO> list = new ArrayList<>();

        List<Order> listOrder = orderDao.findAll();

        listOrder.forEach(order -> {
            AdminOrderDTO newOrder = new AdminOrderDTO(
                    order.getId(),
                    order.getUser().getUsername(),
                    order.getUser().getEmail(),
                    order.getAdress().getPhone(),
                    order.getAdress().getDetail(),
                    order.getCreatedate(),
                    order.getOrderStatus(),
                    order.getOrderDetails()
            );
            list.add(newOrder);
        });

        return ResponseEntity.ok(list);
    }




}

