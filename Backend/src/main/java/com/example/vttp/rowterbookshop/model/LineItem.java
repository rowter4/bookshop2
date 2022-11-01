package com.example.vttp.rowterbookshop.model;

import java.util.logging.Logger;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class LineItem {
    
    private String title;
    private Integer book_id;
    private Integer quantity;
    private String price;
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getBook_id() { return book_id; }
    public void setBook_id(Integer book_id) { this.book_id = book_id; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    
    public String getPrice() { return price;  }
    public void setPrice(String price) {  this.price = price; }



    private static Logger logger = Logger.getLogger(LineItem.class.getName());
    
    public static LineItem create(JsonObject o) {
        LineItem item = new LineItem();
        logger.info("LineItem from JsonObject: %s".formatted(o));
        item.setTitle(o.getString("title"));
        item.setBook_id(o.getInt("book_id"));
        item.setQuantity(o.getInt("quantity"));
        item.setPrice(o.getString("price")); // cannnot convert to float

        return item;
    }
    

    public static LineItem create2(SqlRowSet rs) {

        logger.info("LineItem from rs: %s".formatted(rs));
        logger.info("LineItem from rs: %s".formatted(rs.getString("title")));
        logger.info("LineItem from rs: %s".formatted(rs.getFloat("price")));
        logger.info("LineItem from rs: %s".formatted(rs.getInt("quantity")));

        LineItem lineItem = new LineItem();

        lineItem.setTitle(rs.getString("title"));
        lineItem.setPrice(rs.getString("price"));  // need to change to string 
        lineItem.setQuantity(rs.getInt("quantity"));

        return lineItem;
    }

    

    public JsonObject toJson() {
        return Json.createObjectBuilder()
                .add("title",title)
                .add("quantity", quantity)
                .add("price", price)
                .build();

    }
   
}
