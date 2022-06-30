package com.tea.controller;

import com.tea.entity.Expense_record;
import com.tea.repository.Expense_recordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expense_record")
public class Expense_recordHandler {
    @Autowired
    private Expense_recordRepository expense_recordRepository;

    @GetMapping("/findAll")
    public List<Expense_record> findAll(){return expense_recordRepository.findAll();}

    @PostMapping("/save")
    public String save(@RequestBody Expense_record expense_record){
        Expense_record result = expense_recordRepository.save(expense_record);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @GetMapping("/findById/{id}")
    public Expense_record findById(@PathVariable("id") String id){
        return expense_recordRepository.findById(id).get();
    }

    @GetMapping("/findByEmployeeNo/{employee_no}")
    public List<Expense_record> findByEmployeeNo(@PathVariable("employee_no") String employee_no){
        return expense_recordRepository.findByEmployeeNo(employee_no);
    }

    @PutMapping("/update")
    public String update(@RequestBody Expense_record expense_record){
        Expense_record result = expense_recordRepository.save(expense_record);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") String id){
        expense_recordRepository.deleteById(id);
    }
}
