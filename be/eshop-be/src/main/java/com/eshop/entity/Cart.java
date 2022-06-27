package com.eshop.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer product ;
    private Double  quantity;
    private Integer  username;


//    @ManyToOne
//    @JoinColumn(name="Cart")
//    private User username ;


//    private Date creatdate ;







}
