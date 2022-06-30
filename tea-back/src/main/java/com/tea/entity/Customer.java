package com.tea.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Customer {
    @Id
    private String id;
    private String name;
    private String sex;
    private String type;

}
