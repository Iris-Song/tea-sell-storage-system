package com.tea.repository;

import com.tea.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepository extends JpaRepository<Customer,String>
{
    @Query("select customer.id from Customer customer where customer.name=?1")
    String[] findByName(String name);
}
