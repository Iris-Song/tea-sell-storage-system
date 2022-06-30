package com.tea.entity;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class PurchaseKey implements Serializable {

    private String product_no;

    private String batch;

    public String getProduct_no() {
        return product_no;
    }
    public void setProduct_no(String product_no) {
        this.product_no = product_no;
    }
    public String getBatch() {
        return batch;
    }
    public void setBatch(String batch) {
        this.batch = batch;
    }
}
