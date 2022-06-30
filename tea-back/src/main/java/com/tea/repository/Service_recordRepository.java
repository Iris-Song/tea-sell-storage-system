package com.tea.repository;

import com.tea.entity.Service_record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Service_recordRepository extends JpaRepository<Service_record,String> {
    @Query("select service_record from Service_record service_record where service_record.employee_no=?1")
    List<Service_record> findByEmployeeNo(String employee_no);

    @Query("select service_record from Service_record service_record where service_record.customer_no=?1")
    List<Service_record> findByCustomerNo(String customer_no);
}
