package com.tea.controller;

import com.tea.entity.Employee;
import com.tea.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeHandler {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/findAll")
    public List<Employee> findAll(){
        return employeeRepository.findAll();
    }

    @PostMapping("/save")
    public String save(@RequestBody Employee employee){
        Employee result = employeeRepository.save(employee);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @GetMapping("/findById/{id}")
    public Employee findById(@PathVariable("id") String id){
        return employeeRepository.findById(id).get();
    }

    @GetMapping("/findByName/{name}")
    public String[] findByName(@PathVariable("name") String name){
        return employeeRepository.findByName(name);
    }

    @PutMapping("/update")
    public String update(@RequestBody Employee expense_record){
        Employee result = employeeRepository.save(expense_record);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") String id){
        employeeRepository.deleteById(id);
    }
}
