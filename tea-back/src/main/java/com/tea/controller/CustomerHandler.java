package com.tea.controller;

import com.tea.entity.Customer;
import com.tea.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerHandler {

    @Autowired
    private CustomerRepository customerRespository;

    @GetMapping("/findAll")
    public List<Customer> findAll(){return customerRespository.findAll();}

    @PostMapping("/save")
    public String save(@RequestBody Customer customer){
        Customer result = customerRespository.save(customer);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @GetMapping("/findById/{id}")
    public Customer findById(@PathVariable("id") String id){
        return customerRespository.findById(id).get();
    }

    @GetMapping("/findByName/{name}")
    public String[] findByName(@PathVariable("name") String name){
        return customerRespository.findByName(name);
    }

    @PutMapping("/update")
    public String update(@RequestBody Customer customer){
        Customer result = customerRespository.save(customer);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") String id){
        customerRespository.deleteById(id);
    }
}
