package com.tea.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Product {
    @Id
    private String id;
    private String name;
    private int number_in_shop;
    private int number_in_storehouse;
    private float price;
    private String remarks;
}
