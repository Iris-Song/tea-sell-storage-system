package com.tea.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Expense_record {
    @Id
    private String id;
    private String employee_no;
    private String product_record_no;
    private String service_record_no;
    private float should_pay_amount;
    private float actual_pay_amount;
    private int pay_way;
    private String card_no;
}
