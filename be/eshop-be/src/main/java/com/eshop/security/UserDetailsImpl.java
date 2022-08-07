package com.eshop.security;

import com.eshop.entity.Adress;
import com.eshop.entity.CartItem;
import com.eshop.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private String username;
    private String email;
    private String fullname;
    @JsonIgnore
    private String password;

    private List<Adress> adress;
    private Collection<? extends GrantedAuthority> authorities;

    private boolean activated ;
    private List<CartItem> cartItems;
    public UserDetailsImpl(String username, String email, String password,String fullname,
                           Collection<? extends GrantedAuthority> authorities,List<Adress> adress, List<CartItem> cartItems, boolean activated) {
        this.fullname = fullname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
        this.adress = adress;
        this.cartItems = cartItems;
        this.activated = activated;
    }

    public static UserDetailsImpl build(User user) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        user.getPermissions().forEach(r -> {
            authorities.add(new SimpleGrantedAuthority(r.getRole().getName()));
        });

        return new UserDetailsImpl(
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getFullname(),
                authorities,
                user.getAdress(),
                user.getCartItems(),
                user.getActivated());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }


    public String getFullname() {
        return fullname;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }


    @Override
    public boolean isEnabled() {
        return this.activated;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(username, user.getUsername());
    }

    public List<Adress> getAdress() {
        return adress;
    }

    public void setAdress(List<Adress> adress) {
        this.adress = adress;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }
}
