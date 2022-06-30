package com.tea.controller;

import com.tea.entity.Product;
import com.tea.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductHandler {

    @Autowired
    private ProductRepository productRespository;

    @GetMapping("/findAll")
    public List<Product> findAll(){return productRespository.findAll();}

    @PostMapping("/save")
    public String save(@RequestBody Product product){
        Product result = productRespository.save(product);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @GetMapping("/findById/{id}")
    public Product findById(@PathVariable("id") String id){
        return productRespository.findById(id).get();
    }

    @GetMapping("/findByName/{name}")
    public List<Product> findByName(@PathVariable("name") String name){
        return productRespository.findByName(name);
    }

    @PutMapping("/update")
    public String update(@RequestBody Product product){
        Product result = productRespository.save(product);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") String id){
        productRespository.deleteById(id);
    }
}
