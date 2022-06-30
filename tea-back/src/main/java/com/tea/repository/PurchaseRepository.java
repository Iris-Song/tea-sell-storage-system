package com.tea.repository;

import com.tea.entity.Purchase;
import com.tea.entity.PurchaseKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, PurchaseKey> {
    @Query("select purchase from Purchase purchase where purchase.purchaseKey.product_no=?1")
    List<Purchase> findByProductNo(String product_no);

    @Query("select purchase from Purchase purchase where purchase.employee_no=?1")
    List<Purchase> findByEmployeeNo(String employee_no);
}
