package com.tea.entity;

import lombok.Data;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import java.sql.Date;

@Entity
@Data
public class Purchase {

    @EmbeddedId
    private PurchaseKey purchaseKey;

    private int all_number;
    private String employee_no;
    private Date purchase_date;
    private float price;
    private String remarks;

}
