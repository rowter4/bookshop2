package com.example.vttp.rowterbookshop.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.vttp.rowterbookshop.model.NewOrder;
import com.example.vttp.rowterbookshop.repo.OrderRepository;



@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepo;


    @Transactional
    public Optional<String> saveOrderDetails(NewOrder finalOrder) {
        try {
            System.out.printf(">>> running transactional details and populate the table \n");
            System.out.printf(">>> final order obtained : %s \n".formatted(finalOrder));
            System.out.printf(">>> username obtained to populate table : %s \n".formatted(finalOrder.getUsername()));
            System.out.printf(">>> order Id obtained : %s \n".formatted(finalOrder.getOrder_id()));
            System.out.printf(">>> line Book Order obtained : %s \n".formatted(finalOrder.getBookLineOrder()));
            System.out.printf(">>> grand total obtained : %s \n".formatted(finalOrder.getGrandTotal()));

            orderRepo.insertLineItems(finalOrder.getOrder_id(), finalOrder.getBookLineOrder(), finalOrder.getUsername());
            orderRepo.insertSummaryOrderDetails(finalOrder.getOrder_id(), finalOrder.getUsername(), finalOrder.getGrandTotal());
            return Optional.of(finalOrder.getOrder_id());
        } catch (Exception ex) {
            return Optional.empty();
        }

        
    }
}
