package com.eshop.dto;

public class ProductsRequestByPrice {
    private Integer page;
    private Double strPrice;
    private Double enPrice;

    public ProductsRequestByPrice(Integer page, Double strPrice, Double enPrice) {
        this.page = page;
        this.strPrice = strPrice;
        this.enPrice = enPrice;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Double getStrPrice() {
        return strPrice;
    }

    public void setStrPrice(Double strPrice) {
        this.strPrice = strPrice;
    }

    public Double getEnPrice() {
        return enPrice;
    }

    public void setEnPrice(Double enPrice) {
        this.enPrice = enPrice;
    }
}
