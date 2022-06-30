package com.tea.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class EmployeeRepositoryTest {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Test
    void findAll(){
        System.out.println(employeeRepository.findAll());
    }

    @Test
    void findByName(){
        System.out.println(employeeRepository.findByName("刘璐璐")[0]);
        System.out.println(employeeRepository.findByName("刘璐璐")[1]);
    }

}