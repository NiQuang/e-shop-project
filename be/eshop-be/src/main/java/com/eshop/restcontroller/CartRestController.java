package com.eshop.restcontroller;

import com.eshop.dao.CartItemDAO;
import com.eshop.dao.UserDAO;
import com.eshop.dao.ProductDAO;
import com.eshop.dto.AddToCartRequest;
import com.eshop.entity.CartItem;
import com.eshop.entity.Product;
import com.eshop.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/cart")
public class CartRestController {

    @Autowired
    UserDAO userDAO;

    @Autowired
    ProductDAO prDAO;

    @Autowired
    CartItemDAO cartDAO;

    @PostMapping("/add")
    public ResponseEntity<CartItem> get(@RequestBody AddToCartRequest addRequest){
        System.out.println(addRequest);
        if(!userDAO.existsById(addRequest.getUsername()) || !prDAO.existsById(addRequest.getProductId())){
            return ResponseEntity.notFound().build();
        }

        CartItem cartItem = cartDAO.findByUsernameAndProductId(addRequest.getUsername(), addRequest.getProductId());
        if(cartItem == null){
            cartItem = new CartItem();
            Product product = new Product();
            product.setId(addRequest.getProductId());
            User user = new User();
            user.setUsername(addRequest.getUsername());
            cartItem.setProduct(product);
            cartItem.setUser(user);
            cartItem.setQuantity(1);
        }else{
            cartItem.setQuantity(cartItem.getQuantity() + 1);
        }

        return  ResponseEntity.ok(cartDAO.save(cartItem));
    }

}
