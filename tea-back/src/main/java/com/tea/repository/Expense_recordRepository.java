package com.tea.repository;

import com.tea.entity.Expense_record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Expense_recordRepository extends JpaRepository<Expense_record,String> {
    @Query("select expense_record from Expense_record expense_record where expense_record.employee_no=?1")
    List<Expense_record> findByEmployeeNo(String employee_no);
}
