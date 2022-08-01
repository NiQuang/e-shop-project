package com.eshop.restcontroller;

import com.eshop.dao.UserDAO;
import com.eshop.dto.ChangePass;
import com.eshop.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Stream;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/users")
public class UserRestController {
    private final Logger log = LoggerFactory.getLogger(UserRestController.class);
    @Autowired
    UserDAO userDAO;

    @Autowired
    PasswordEncoder encoder;

    @GetMapping("/getall")
    public ResponseEntity<Stream<User>> getAll(@RequestParam Integer page) {
        log.info("Gọi vào hàm lấy danh sách user");
        if (page > 0) {
            Pageable setpage = PageRequest.of(page, 10);
            return ResponseEntity.ok(userDAO.findAll(setpage).stream());
        } else {
            Pageable setpage = PageRequest.of(0, 10);
            return ResponseEntity.ok(userDAO.findAll(setpage).stream());
        }
    }
    @GetMapping("/userdetails")
    public ResponseEntity<Optional<User>> getById(@RequestParam String username){
        log.info("Gọi vào hàm thông tin user theo username");
        if(!userDAO.existsById(username)){
            log.error("Không tìm thấy user với username: "+username);
            return ResponseEntity.notFound().build();
        }
            return ResponseEntity.ok(userDAO.findById(username));

    }
    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable("id") String id,@RequestBody User userr){
        log.info("Gọi vào hàm cập nhập user: "+userr.getUsername());
        User u =userDAO.findById(id).get();
        userr.setPassword(u.getPassword());
        userDAO.save(userr);
        return userr;
    }

    @PutMapping("/changepassword/{id}")
    public String changePass(@PathVariable("id") String id, @RequestBody ChangePass changePass){
        User u = userDAO.findById(id).get();
        if(changePass.getOldpass().equals(u.getPassword())){
            System.out.println("check 1");
            if(changePass.getNewpass().equals(changePass.getConfirmpass())){
                u.setPassword(encoder.encode(changePass.getNewpass()));
                userDAO.save(u);
                return "đổi mật khẩu thành công";
            }else{
                System.out.println("nhập lại sai pass");
                return null;
            }
        }else {
            System.out.println("check 2");
            return "Mat khau cu khong dung";
        }
    }
}
