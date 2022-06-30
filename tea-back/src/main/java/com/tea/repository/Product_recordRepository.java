package com.tea.repository;

import com.tea.entity.Product_record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Product_recordRepository extends JpaRepository<Product_record,String> {
    @Query("select product_record from Product_record product_record where product_record.employee_no=?1")
    List<Product_record> findByEmployeeNo(String employee_no);

    @Query("select product_record from Product_record product_record where product_record.customer_no=?1")
    List<Product_record> findByCustomerNo(String employee_no);
}
