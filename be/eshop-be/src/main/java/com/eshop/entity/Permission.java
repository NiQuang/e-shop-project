package com.eshop.entity;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Permission")
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "username")
    private User user;


    @ManyToOne
    @JoinColumn(name ="roleid")
    private Role role;
}
