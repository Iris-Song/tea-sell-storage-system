package com.tea.entity;

import lombok.Data;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import java.sql.Date;

@Entity
@Data
public class Shipment {

    @EmbeddedId
    private ShipmentKey shipmentKey;
    private int all_number;
    private String employee_no;
    private Date shipment_date;
    private String remarks;
}
