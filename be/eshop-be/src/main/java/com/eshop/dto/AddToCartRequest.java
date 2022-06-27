package com.eshop.dto;

import java.io.Serializable;

public class AddToCartRequest implements Serializable {
    private String username;
    private Integer productId;

    public AddToCartRequest() {
    }

    public AddToCartRequest(String username, Integer productId) {
        this.username = username;
        this.productId = productId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    @Override
    public String toString() {
        return "AddToCartRequest{" +
                "username='" + username + '\'' +
                ", productId=" + productId +
                '}';
    }
}
