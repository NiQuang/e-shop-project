package com.eshop.restcontroller;

import java.util.Collection;

import com.eshop.dao.CategoryDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eshop.dao.ProductDAO;
import com.eshop.entity.Category;
import com.eshop.entity.Product;

@CrossOrigin("*")
@RestController
public class ProductsRestController {
	
	@Autowired
	CategoryDAO cateDAO;
	
	
	@Autowired
	ProductDAO dao;
	
	@GetMapping("/api/products")
	public ResponseEntity<Collection<Product>> getAll(){
		return ResponseEntity.ok(dao.findAll());
	}
	
	
	@GetMapping("/api/products/{id}")
	public ResponseEntity<Product> getProduct(@PathVariable("id") Integer id){
		if(!dao.existsById(id)){
			System.out.println("k co dau bro");
			return ResponseEntity.notFound().build();
		}
		System.out.println("tim dc ngay");
		return ResponseEntity.ok(dao.findById(id).get());
	}
	
	
	@PostMapping("/api/products")
	public Product createProduct(@RequestBody Product product) {
		Category category = cateDAO.findById(product.getCategory().getId()).get();
		product.setCategory(category);
		dao.save(product);
		return(product);
	}
	
	
	@PutMapping("/api/products/{id}")
	public Product updateProduct(@PathVariable("id") Integer id, @RequestBody Product product) {
		Category category = cateDAO.findById(product.getCategory().getId()).get();
		product.setCategory(category);
		product.setId(id);
		dao.save(product);
		return product;
	}
	
	
	@DeleteMapping("/api/products/{id}")
	public Object deleteProduct(@PathVariable("id") Integer id) {
		dao.deleteById(id);
		return null;
	}
}
