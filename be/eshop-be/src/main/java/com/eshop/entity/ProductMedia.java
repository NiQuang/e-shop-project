package com.eshop.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Productmedia")
@NoArgsConstructor
@AllArgsConstructor
public class ProductMedia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "medialink")
    private String mediaLink;

    @ManyToOne @JoinColumn(name = "productid")
    @JsonIgnore
    private Product product;
}
