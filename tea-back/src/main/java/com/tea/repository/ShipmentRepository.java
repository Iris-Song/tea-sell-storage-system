package com.tea.repository;

import com.tea.entity.Shipment;
import com.tea.entity.ShipmentKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShipmentRepository extends JpaRepository<Shipment, ShipmentKey> {
    @Query("select shipment from Shipment shipment where shipment.shipmentKey.product_no=?1")
    List<Shipment> findByProductNo(String product_no);

    @Query("select shipment from Shipment shipment where shipment.employee_no=?1")
    List<Shipment> findByEmployeeNo(String employee_no);
}
