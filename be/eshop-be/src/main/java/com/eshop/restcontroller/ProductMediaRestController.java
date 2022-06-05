package com.eshop.restcontroller;


import com.eshop.dao.ProductDAO;
import com.eshop.dao.ProductMediaDAO;
import com.eshop.entity.Product;
import com.eshop.entity.ProductMedia;
import com.eshop.service.FileService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/product-medias")
public class ProductMediaRestController {

    @Autowired
    ProductMediaDAO dao;

    @Autowired
    ProductDAO prdDAO;

    @Autowired
    FileService fileService;

    @GetMapping
    public ResponseEntity<List<ProductMedia>> getAll(){
        return ResponseEntity.ok(dao.findAll());
    }


    @PostMapping("{id}")
    public ResponseEntity<ProductMedia> createProductMedia(@PathVariable("id") Integer id,@RequestBody ProductMedia media){
        Product product = new Product();
        if(!prdDAO.existsById(id)){
            return ResponseEntity.notFound().build();
        }else{
            product.setId(id);
            media.setProduct(product);
        }
        dao.save(media);
        return ResponseEntity.ok(media);
    }

    @PostMapping
    public ResponseEntity<ProductMedia> createMedia(@RequestBody JsonNode item) throws JsonProcessingException {
        Product product = new Product();
        ProductMedia media = new ProductMedia();
        Integer id = item.get("product").get("id").asInt();
        product.setId(id);
        media.setMediaLink(item.get("mediaLink").asText());
        if(!prdDAO.existsById(id)){
            return ResponseEntity.notFound().build();
        }else{
            product.setId(id);
            media.setProduct(product);
        }
        dao.save(media);
        return ResponseEntity.ok(media);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        if(!dao.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        ProductMedia media = dao.findById(id).get();
        fileService.delete("images", media.getMediaLink());
        dao.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
