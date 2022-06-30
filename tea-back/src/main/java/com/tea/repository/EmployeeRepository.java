package com.tea.repository;

import com.tea.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee,String>
{
    @Query("select employee.id from Employee employee where employee.name=?1")
    String[] findByName(String name);
}
