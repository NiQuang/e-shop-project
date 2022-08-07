package com.eshop.dto;
import com.eshop.entity.OrderDetail;
import java.util.Date;
import java.util.List;

public class AdminOrderDTO {
    private Long id;
    private String username;
    private String email;
    private String phone;
    private String adress;
    private Date createdate;
    private Integer orderStatus;
    private List<OrderDetail> orderDetails;

    public AdminOrderDTO() {
    }

    public AdminOrderDTO(Long id, String username, String email, String phone, String adress, Date createdate, Integer orderStatus, List<OrderDetail> orderDetails) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.adress = adress;
        this.createdate = createdate;
        this.orderStatus = orderStatus;
        this.orderDetails = orderDetails;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public Date getCreatedate() {
        return createdate;
    }

    public void setCreatedate(Date createdate) {
        this.createdate = createdate;
    }

    public Integer getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(Integer orderStatus) {
        this.orderStatus = orderStatus;
    }

    public List<OrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetail> orderDetails) {
        this.orderDetails = orderDetails;
    }

    @Override
    public String toString() {
        return "AdminOrderDTO{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", adress='" + adress + '\'' +
                ", createdate=" + createdate +
                ", orderStatus=" + orderStatus +
                ", orderDetails=" + orderDetails +
                '}';
    }
}
