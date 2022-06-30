package com.tea.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Card {
    @Id
    private String card_id;
    private String customer_id;
    private float balance;
}
