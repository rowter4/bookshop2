package com.example.vttp.rowterbookshop.model;

import java.io.StringReader;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

public class NewOrder {
    private String order_id;
    private String grandTotal;
    private String username;
    private List<LineItem> bookLineOrder = new LinkedList<>();

    public String getOrder_id() { return order_id;  }
    public void setOrder_id(String order_id) { this.order_id = order_id; }
    

    public List<LineItem> getBookLineOrder() { return bookLineOrder; }
    public void setBookLineOrder(List<LineItem> bookLineOrder) { this.bookLineOrder = bookLineOrder; }
    public void addLineItem(LineItem lineItem) { this.bookLineOrder.add(lineItem); }

    public String getGrandTotal() { return grandTotal;  }
    public void setGrandTotal(String grandTotal) { this.grandTotal = grandTotal; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }


    public static NewOrder create(String json) {

        NewOrder order = new NewOrder();

        List<LineItem> result = new LinkedList<>();

        JsonReader reader = Json.createReader(new StringReader(json));
        JsonObject obj = reader.readObject();

        JsonArray finalOrder = obj.getJsonArray("bookLineOrder");

        System.out.printf("data inside new item order: %s \n", finalOrder);

        for (int i =0; i < finalOrder.size(); i++) {
            System.out.printf("array loop: %d \n", i);
            JsonObject lineItem = finalOrder.getJsonObject(i);
            System.out.printf("json object being read out: %s \n", lineItem);
            result.add(LineItem.create(finalOrder.getJsonObject(i)));
        }

        order.bookLineOrder = result;

        // Read the payload and save the data to database
        String id = UUID.randomUUID().toString().substring(0, 8);        
        System.out.printf("UUID generated: %s \n", id);
        
        order.order_id = id; 
        order.grandTotal = obj.getString("grandTotal");
        order.username = obj.getString("username");

        return order;

    }
    
    
   

}
