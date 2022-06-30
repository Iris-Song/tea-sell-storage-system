package com.tea.controller;

import com.tea.entity.Card;
import com.tea.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/card")
public class CardHandler {

    @Autowired
    private CardRepository cardRepository;

    @GetMapping("/findAll")
    public List<Card> findAll(){return cardRepository.findAll();}

    @PostMapping("/save")
    public String save(@RequestBody Card card){
        Card result = cardRepository.save(card);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @GetMapping("/findById/{id}")
    public Card findById(@PathVariable("id") String id){
        return cardRepository.findById(id).get();
    }

    @GetMapping("/findByCustomerId/{customer_id}")
    public List<Card> findByCustomerId(@PathVariable("customer_id") String customer_id){
        return cardRepository.findByCustomerId(customer_id);
    }

    @PutMapping("/update")
    public String update(@RequestBody Card card){
        Card result = cardRepository.save(card);
        if(result!=null){
            return "success";
        }else{
            return "error";
        }
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") String id){
        cardRepository.deleteById(id);
    }

}
