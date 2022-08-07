package com.eshop.dto;

import java.util.List;
import java.util.Set;

import com.eshop.entity.OrderDetail;

public class OrderRequest {

    private String username;

    private Integer adress;

    private String phonenumber;

    private Integer status;

    private List<OrderDetail> orderDetails;

    public OrderRequest() {
    }

    public OrderRequest(String username, Integer adress, String phonenumber, int status, List<OrderDetail> orderDetails) {
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

    public Integer getAdress() {
        return adress;
    }

    public void setAdress(Integer adress) {
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

    public List<OrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetail> orderDetails) {
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
