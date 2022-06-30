package com.tea.controller;

import com.tea.entity.Purchase;
import com.tea.entity.PurchaseKey;
import com.tea.repository.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/purchase")
public class PurchaseHandler {

    @Autowired
    private PurchaseRepository purchaseRespository;

    @GetMapping("/findAll")
    public List<Purchase> findAll(){return purchaseRespository.findAll();}

    @PostMapping("/save")
    public String save(@RequestBody Purchase purchase){
        Purchase result = purchaseRespository.save(purchase);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @GetMapping("/findById")
    public Purchase findById(@Param("product_no") String product_no,
                             @Param("batch") String batch){
        PurchaseKey purchaseKey=new PurchaseKey();;
        purchaseKey.setProduct_no(product_no);
        purchaseKey.setBatch(batch);
        return purchaseRespository.findById(purchaseKey).get();
    }

    @GetMapping("/findByProductNo/{product_no}")
    public List<Purchase> findByProductNo(@PathVariable("product_no") String product_no){
        return purchaseRespository.findByProductNo(product_no);
    }

    @GetMapping("/findByEmployeeNo/{employee_no}")
    public List<Purchase> findByEmployeeNo(@PathVariable("employee_no") String employee_no){
        return purchaseRespository.findByEmployeeNo(employee_no);
    }

    @PutMapping("/update")
    public String update(@RequestBody Purchase purchase){
        Purchase result = purchaseRespository.save(purchase);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @DeleteMapping("/deleteById")
    public void deleteById(@Param("product_no") String product_no,
                           @Param("batch") String batch){
        PurchaseKey purchaseKey=new PurchaseKey();;
        purchaseKey.setProduct_no(product_no);
        purchaseKey.setBatch(batch);
        purchaseRespository.deleteById(purchaseKey);
    }
}
