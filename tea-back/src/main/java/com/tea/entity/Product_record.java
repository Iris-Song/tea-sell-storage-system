package com.tea.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Product_record {
    @Id
    private String id;
    private String employee_no;
    private String product_no;
    private String customer_no;
    private int num;
}
