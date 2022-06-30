package com.tea.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ShipmentRepositoryTest {
    @Autowired
    private ShipmentRepository shipmentRepository;
    @Test
    void findAll(){
        System.out.println(shipmentRepository.findAll());
    }

    @Test
    void findByProductNo(){
        System.out.println(shipmentRepository.findByProductNo("0000000000"));
    }

}