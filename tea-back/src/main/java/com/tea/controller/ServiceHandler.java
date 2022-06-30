package com.tea.controller;

import com.tea.entity.Service;
import com.tea.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/service")
public class ServiceHandler {

    @Autowired
    private ServiceRepository serviceRespository;

    @GetMapping("/findAll")
    public List<Service> findAll(){return serviceRespository.findAll();}

    @PostMapping("/save")
    public String save(@RequestBody Service service){
        Service result = serviceRespository.save(service);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @GetMapping("/findById/{id}")
    public Service findById(@PathVariable("id") String id){
        return serviceRespository.findById(id).get();
    }

    @PutMapping("/update")
    public String update(@RequestBody Service service){
        Service result = serviceRespository.save(service);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") String id){
        serviceRespository.deleteById(id);
    }
}
