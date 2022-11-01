package com.example.vttp.rowterbookshop.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vttp.rowterbookshop.model.NewOrder;
import com.example.vttp.rowterbookshop.model.UserResponse;
import com.example.vttp.rowterbookshop.service.EmailSenderService;
import com.example.vttp.rowterbookshop.service.OrderService;


import java.util.Optional;
// import java.util.UUID;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping(path="/submit-order", produces=MediaType.APPLICATION_JSON_VALUE)
public class ProcessOrderController {

    @Autowired
    private OrderService orderSvc;

    @Autowired
	private EmailSenderService senderService;

    private Logger logger = Logger.getLogger(ProcessOrderController.class.getName());

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postRegistration(@RequestBody String payload) {

        NewOrder newOrder;
        UserResponse resp;

        logger.info("Payload: %s".formatted(payload));

        newOrder = NewOrder.create(payload);

        logger.info("new Order after being created: %s".formatted(newOrder));

        Optional<String> finalOrderId = orderSvc.saveOrderDetails(newOrder);


        if (finalOrderId.isEmpty()) {
            logger.info("no final Id is being generated");
            UserResponse response = new UserResponse();
            response.setStatus(404);
            response.setMessage("Unable to retrieve book detail from book detail");

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body(response.toJson().toString());

        } else {
            String orderId = finalOrderId.get();
            logger.info("final Id is : " + orderId);

            senderService.sendEmail(newOrder.getUsername(), 
                                    "Your Order with Rowter Bookshop",
                                    "Dear Customer, \n\n Your purchase is successful! \n\n Your order id is: %s \n\n Thank you for shopping at Rowter Bookshop".formatted(orderId));

            resp = new UserResponse();
            resp.setStatus(201);
            resp.setMessage(orderId);
           
            return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(resp.toJson().toString());
        }
        

        
      
    }
    
}
