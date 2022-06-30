package com.tea.entity;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class ShipmentKey implements Serializable {
    private String product_no;
    private String batch;
}
