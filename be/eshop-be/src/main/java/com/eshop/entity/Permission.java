package com.eshop.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private User user;


    @ManyToOne
    @JoinColumn(name ="roleid")
    private Role role;
}
