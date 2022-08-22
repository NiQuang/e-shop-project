package com.eshop.restcontroller;

import com.eshop.dto.AdminOrderDTO;
import com.eshop.dto.OrderRequest;
import com.eshop.entity.Adress;
import com.eshop.entity.Order;
import com.eshop.entity.OrderDetail;
import com.eshop.dao.OrderDAO;;
import com.eshop.dao.OrderDetailDAO;
import com.eshop.dao.UserDAO;
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

    @Autowired
    UserDAO userDAO;

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

    @GetMapping("my")
    public ResponseEntity<List<Order>> myOrder(@RequestParam(name = "username") String username){
        List<Order> list = new ArrayList<>();
        System.out.println(username);
        list = orderDao.findByUsername(username);
//        System.out.println(list);
        System.out.println(list.size());
        return ResponseEntity.ok(list);
    }


    @GetMapping("my/detail")
    public ResponseEntity<Order> myOrderDetail(@RequestParam(name="username") String username, @RequestParam(name="orderid") Long orderid){
        List<Order> list = new ArrayList<>();
        Order order = new Order();
        Long id = Long.parseLong(orderid.toString());
        System.out.println(username);
        System.out.println(id);

        User user = userDAO.findById(username).get();
        if(orderDao.existsByUserAndId(user, id)){
            order = orderDao.findById(id).get();
        }else{
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(order);
    }



}

