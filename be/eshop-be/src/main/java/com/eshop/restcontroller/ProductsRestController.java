package com.eshop.restcontroller;

import java.util.Collection;
import java.util.List;
import java.util.stream.Stream;

import com.eshop.dao.CategoryDAO;
import com.eshop.dto.ProductsRequestByPrice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eshop.dao.ProductDAO;
import com.eshop.entity.Category;
import com.eshop.entity.Product;

@CrossOrigin("*")
@RestController
public class ProductsRestController {
	private final Logger log = LoggerFactory.getLogger(ProductsRestController.class);
	@Autowired
	CategoryDAO cateDAO;
	
	
	@Autowired
	ProductDAO dao;
	
	@GetMapping("/api/products")
	public ResponseEntity<Collection<Product>> getAll(){
		return ResponseEntity.ok(dao.findAll());
	}

	/**
	 *
	 * @param page truyen vao so page can hien thi
	 * @return số page và sản phẩm trong page, hiện tại đang set là 8
	 */
	@GetMapping("/api/products/page")
	public ResponseEntity<Stream<Product>> GetByPage(@RequestParam(required = false) Integer page){
		System.out.println("goi vao ham phan trang");
		System.out.println("page");
		if(page >0 ){
			Pageable setpage = PageRequest.of(page,8);
			return ResponseEntity.ok(dao.findAllByOrderByCreatedateDesc(setpage).stream());
		}else{
			Pageable setpage = PageRequest.of(0,8);
			return ResponseEntity.ok(dao.findAllByOrderByCreatedateDesc(setpage).stream());
		}
	}
	@GetMapping("/api/products/category")
	public ResponseEntity<Stream<Product>> getbyCategory(@RequestParam Integer categoryid,@RequestParam Integer page){
		System.out.println("goi vao ham tim kiem theo category");
		System.out.println(categoryid);
		if(page >0 ){
			Pageable setpage = PageRequest.of(page,8);
			return ResponseEntity.ok(dao.findByCategory_Id(categoryid,setpage).stream());
		}else{
			Pageable setpage = PageRequest.of(0,8);
			return ResponseEntity.ok(dao.findByCategory_Id(categoryid,setpage).stream());
		}

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

	@GetMapping("/api/products/get/newcreate")
	public ResponseEntity<List<Product>> getNewCreateProduct(){
		System.out.println();
		return ResponseEntity.ok(dao.findNewCreateProduct());

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

	@GetMapping("/api/products/byprice")
	public ResponseEntity<Stream<Product>> findByPrice(@RequestBody ProductsRequestByPrice pr){
		System.out.println(pr.getStrPrice());
		System.out.println(pr.getEnPrice());
		log.info("gọi vào hàm tìm theo giá từ: "+ pr.getStrPrice() +"tới: " +pr.getEnPrice());
		if(pr.getPage() >=0 ){
			Pageable setpage = PageRequest.of(pr.getPage(), 2);
			return ResponseEntity.ok(dao.findByPriceBetween(pr.getStrPrice(), pr.getEnPrice(), setpage).stream());
		}else{
			Pageable setpage = PageRequest.of(0,2);
			return ResponseEntity.ok(dao.findByPriceBetween(pr.getStrPrice(), pr.getEnPrice(), setpage).stream());
		}
//			List<Product> products = dao.findByPriceBetween(1.0,1000000.0);
//		System.out.println(products);
//		return  ResponseEntity.ok(dao.findByPriceBetween(pr.getStrPrice(), pr.getEnPrice()));
	}

}
