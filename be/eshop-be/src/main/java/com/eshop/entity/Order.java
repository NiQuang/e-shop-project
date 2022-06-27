package com.eshop.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="Orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String phonenumber;
    private Integer status;
    private Date createdate = new Date();
    @ManyToOne
    @JoinColumn(name="username")
    private User user;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private Set<OrderDetail> orderDetails= new HashSet<>();

    @ManyToOne
    @JoinColumn(name="adressid")
    private Adress adress;

}
