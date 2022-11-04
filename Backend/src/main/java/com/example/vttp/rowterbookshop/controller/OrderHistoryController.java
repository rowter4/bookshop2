package com.example.vttp.rowterbookshop.controller;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import com.example.vttp.rowterbookshop.model.BookOrderHistory;
import com.example.vttp.rowterbookshop.model.LineItem;
import com.example.vttp.rowterbookshop.repo.OrderRepository;


@RestController
@RequestMapping(produces=MediaType.APPLICATION_JSON_VALUE)
public class OrderHistoryController {

    @Autowired
    private OrderRepository orderRepo;

    private Logger logger = Logger.getLogger(OrderHistoryController.class.getName());

    @GetMapping(path="/pastorders/{email}")
    public ResponseEntity<String> getOrderHistory(@RequestParam String email) {
        
        List<BookOrderHistory> bookOrderList = orderRepo.getAllOrder(email);

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();

        for (BookOrderHistory history: bookOrderList)
            arrBuilder.add(history.toJson());

        return ResponseEntity.ok(arrBuilder.build().toString());
    }


    @GetMapping(path="/pastorderdetail")
    public ResponseEntity<String> getOrderDetail(@RequestParam String ord_id) {

        logger.info("order Id obtained :  %s".formatted(ord_id));
        
        List<LineItem> bookDetailList = orderRepo.getOrderByOrdId(ord_id);

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();

        for (LineItem detail: bookDetailList)
            arrBuilder.add(detail.toJson());

        return ResponseEntity.ok(arrBuilder.build().toString());
    }
    
}
