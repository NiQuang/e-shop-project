package com.eshop.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="Orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    @Column(name = "status")
    private Integer orderStatus;
    private Date createdate = new Date();
    @ManyToOne
    @JoinColumn(name="username")
//    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "order")
    private List<OrderDetail> orderDetails= new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="adressid")
    private Adress adress;



}
