package com.tea.controller;

import com.tea.entity.Service_record;
import com.tea.repository.Service_recordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/service_record")
public class Service_recordHandler {

    @Autowired
    private Service_recordRepository service_recordRespository;

    @GetMapping("/findAll")
    public List<Service_record> findAll(){return service_recordRespository.findAll();}

    @PostMapping("/save")
    public String save(@RequestBody Service_record service_record){
        Service_record result = service_recordRespository.save(service_record);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @GetMapping("/findById/{id}")
    public Service_record findById(@PathVariable("id") String id){
        return service_recordRespository.findById(id).get();
    }

    @GetMapping("/findByEmployeeNo/{employee_no}")
    public List<Service_record> findByEmployeeNo(@PathVariable("employee_no") String employee_no){
        return service_recordRespository.findByEmployeeNo(employee_no);
    }

    @GetMapping("/findByCustomerNo/{customer_no}")
    public List<Service_record> findByCustomerNo(@PathVariable("customer_no") String customer_no){
        return service_recordRespository.findByCustomerNo(customer_no);
    }

    @PutMapping("/update")
    public String update(@RequestBody Service_record service_record){
        Service_record result = service_recordRespository.save(service_record);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") String id){
        service_recordRespository.deleteById(id);
    }
}
