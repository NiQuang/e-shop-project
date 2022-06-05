package com.eshop.restcontroller;

import java.util.List;
import java.util.Optional;

import com.eshop.dao.CategoryDAO;
import com.eshop.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/categories")
public class CategoriesRestController {
    @Autowired
    CategoryDAO dao;

    @GetMapping
    public ResponseEntity<List<Category>> getAll(Model model){
        return ResponseEntity.ok(dao.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<Category> getById(@PathVariable("id") Integer id){
        Optional<Category> optional = dao.findById(id);
        if(!optional.isPresent()){
            return  ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optional.get());
    }

    @PostMapping
    public ResponseEntity<Category> post(@RequestBody Category category) {
        dao.save(category);
        return ResponseEntity.ok(category);
    }


    @PutMapping("{id}")
    public ResponseEntity<Category> put(@PathVariable("id") Integer id, @RequestBody Category category) {
        if(!dao.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        Category edittedCategory = new Category();
        edittedCategory.setId(id);
        edittedCategory.setTitle(category.getTitle());
        dao.save(edittedCategory);
        return ResponseEntity.ok(edittedCategory);
    }


    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
        if(!dao.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        dao.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
