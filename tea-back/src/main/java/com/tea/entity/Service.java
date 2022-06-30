package com.tea.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Service {
    @Id
    private String id;
    private String name;
    private float price;
    private String remarks;
}
