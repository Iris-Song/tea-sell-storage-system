package com.tea.repository;

import com.tea.entity.Customer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CustomerRepositoryTest {
    @Autowired
    private CustomerRepository customerRepository;

    @Test
    void findAll(){
        System.out.println(customerRepository.findAll());
    }

    @Test
    void save(){
        Customer customer=new Customer();
        customer.setName("孙中");
        customer.setSex("f");
        customer.setType("P");
        customer.setId("10023");
        Customer customer1 = customerRepository.save(customer);
        System.out.println(customer1);
    }

    @Test
    void findById(){
        Customer customer = customerRepository.findById("10023").get();
        System.out.println(customer);
    }


}
