package com.tea.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Employee {
    @Id //是指定当前实体的主键是哪一个属性，因为实体和数据库表绑定到一起了，所以说必须指定
    private String id;//
    private String name;
    private String sex;
    private String is_on_job;
    private String tel;
    private String type;
    private Integer permission;
    private String password;

}
