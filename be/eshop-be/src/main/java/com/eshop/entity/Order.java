package com.eshop.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="Orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String adress;
    private String phonenumber;
    private Integer status;
    @ManyToOne
    @JoinColumn(name="username")
    private User user;
    @OneToMany(mappedBy = "order")
    private List<OrderDetail> orderDetails;

}
