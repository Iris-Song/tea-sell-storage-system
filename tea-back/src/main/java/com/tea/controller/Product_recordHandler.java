package com.tea.controller;

import com.tea.entity.Product_record;
import com.tea.entity.Service_record;
import com.tea.repository.Product_recordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product_record")
public class Product_recordHandler {

    @Autowired
    private Product_recordRepository product_recordRespository;

    @GetMapping("/findAll")
    public List<Product_record> findAll(){return product_recordRespository.findAll();}

    @PostMapping("/save")
    public String save(@RequestBody Product_record product_record){
        Product_record result = product_recordRespository.save(product_record);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @GetMapping("/findById/{id}")
    public Product_record findById(@PathVariable("id") String id){
        return product_recordRespository.findById(id).get();
    }

    @GetMapping("/findByEmployeeNo/{employee_no}")
    public List<Product_record> findByEmployeeNo(@PathVariable("employee_no") String employee_no){
        return product_recordRespository.findByEmployeeNo(employee_no);
    }

    @GetMapping("/findByCustomerNo/{customer_no}")
    public List<Product_record> findByCustomerNo(@PathVariable("customer_no") String customer_no){
        return product_recordRespository.findByCustomerNo(customer_no);
    }


    @PutMapping("/update")
    public String update(@RequestBody Product_record product_record){
        Product_record result = product_recordRespository.save(product_record);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") String id){
        product_recordRespository.deleteById(id);
    }
}
