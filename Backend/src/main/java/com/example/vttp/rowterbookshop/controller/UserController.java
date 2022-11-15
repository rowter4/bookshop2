package com.example.vttp.rowterbookshop.controller;

import java.util.Optional;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.vttp.rowterbookshop.model.UserResponse;
import com.example.vttp.rowterbookshop.service.UserService;




@RestController
public class UserController {

    @Autowired
    private UserService userSvc;

    Logger logger = Logger.getLogger(UserController.class.getName());

    @PostMapping(path = "/name")
    public ResponseEntity<String> getName(@RequestBody String email) {

        logger.info(">>>> EMAIL read in being passed : %s".formatted(email));

        Optional<String> opt = userSvc.getNameFromEmail(email);

        // logger.info("Book ID being passed : %s".formatted(bookId));


        if (opt.isEmpty()) {
            UserResponse response = new UserResponse();
            response.setStatus(404);
            response.setMessage("Unable to retrieve book detail from book detail");

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body(response.toJson().toString());

        } else {
            String name = opt.get();

            logger.info("Name able to see at controller : %s".formatted(name));

            UserResponse resp = new UserResponse();
            resp.setStatus(200);
            resp.setMessage(name);
           
            return ResponseEntity
                .status(HttpStatus.OK)
                .body(resp.toJson().toString());
            

        }
        
    }

}
