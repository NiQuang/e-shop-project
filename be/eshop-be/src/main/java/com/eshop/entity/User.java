package com.eshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="Users")
public class User {

    @Id
    private String username;
    private String password;
    private String fullname;
    private String email;
    private String photo;
    private Boolean activated;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    @OneToMany(mappedBy = "user")
//    @JsonIgnore
    private List<Permission> permissions;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="permission", joinColumns = @JoinColumn(name="username")
            ,inverseJoinColumns = @JoinColumn(name = "roleid"))
    private Set<Role> roles = new HashSet<>();
}