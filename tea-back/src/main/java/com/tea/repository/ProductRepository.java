package com.tea.repository;

import com.tea.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,String> {
    @Query("select product from Product product where product.name like %?1%")
    List<Product> findByName(String name);
}
