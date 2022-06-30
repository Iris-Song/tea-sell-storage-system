package com.tea.controller;

import com.tea.entity.Shipment;
import com.tea.entity.ShipmentKey;
import com.tea.repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shipment")
public class ShipmentHandler {

    @Autowired
    private ShipmentRepository shipmentRespository;

    @GetMapping("/findAll")
    public List<Shipment> findAll(){return shipmentRespository.findAll();}

    @PostMapping("/save")
    public String save(@RequestBody Shipment shipment){
        Shipment result = shipmentRespository.save(shipment);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @GetMapping("/findById")
    public  Shipment findById(@Param("product_no") String product_no,
                             @Param("batch") String batch){
        ShipmentKey shipmentKey=new ShipmentKey();
        shipmentKey.setProduct_no(product_no);
        shipmentKey.setBatch(batch);
        return shipmentRespository.findById(shipmentKey).get();
    }

    @GetMapping("/findByProductNo/{product_no}")
    public List<Shipment> findByProductNo(@PathVariable("product_no") String product_no){
        return shipmentRespository.findByProductNo(product_no);
    }

    @GetMapping("/findByEmployeeNo/{employee_no}")
    public List<Shipment> findByEmployeeNo(@PathVariable("employee_no") String employee_no){
        return shipmentRespository.findByEmployeeNo(employee_no);
    }

    @PutMapping("/update")
    public String update(@RequestBody Shipment shipment){
        Shipment result = shipmentRespository.save(shipment);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @DeleteMapping("/deleteById")
    public void deleteById(@Param("product_no") String product_no,
                           @Param("batch") String batch){
        ShipmentKey shipmentKey=new ShipmentKey();
        shipmentKey.setProduct_no(product_no);
        shipmentKey.setBatch(batch);
        shipmentRespository.deleteById(shipmentKey);
    }
}
