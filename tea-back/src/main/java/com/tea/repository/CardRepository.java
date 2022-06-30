package com.tea.repository;

import com.tea.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CardRepository extends JpaRepository<Card,String> {
    @Query("select card from Card card where card.customer_id=?1")
    List<Card> findByCustomerId(String card_id);
}
