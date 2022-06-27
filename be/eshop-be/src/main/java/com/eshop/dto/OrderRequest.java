package com.eshop.dto;

import java.util.List;
import java.util.Set;

import com.eshop.entity.OrderDetail;

public class OrderRequest {

    private String username;

    private String adress;

    private String phonenumber;

    private Integer status;

    private Set<OrderDetail> orderDetails;

    public OrderRequest() {
    }

    public OrderRequest(String username, String adress, String phonenumber, int status, Set<OrderDetail> orderDetails) {
        this.username = username;
        this.adress = adress;
        this.phonenumber = phonenumber;
        this.status = status;
        this.orderDetails = orderDetails;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Set<OrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(Set<OrderDetail> orderDetails) {
        this.orderDetails = orderDetails;
    }

    @Override
    public String toString() {
        return "OrderRequest{" +
                "username='" + username + '\'' +
                ", adress='" + adress + '\'' +
                ", phonenumber='" + phonenumber + '\'' +
                ", status=" + status +
                ", orderDetails=" + orderDetails +
                '}';
    }
}
