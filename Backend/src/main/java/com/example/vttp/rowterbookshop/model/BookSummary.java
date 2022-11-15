package com.example.vttp.rowterbookshop.model;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.tomcat.util.codec.binary.Base64;
import jakarta.json.Json;
import jakarta.json.JsonObject;


public class BookSummary {

    private String bookTitle;
    private Float price;
    private Integer id;
    private byte[] bookPhoto;

    public String getBookTitle() { return bookTitle; }
    public void setBookTitle(String bookTitle) { this.bookTitle = bookTitle; }

    public Float getPrice() { return price;  }
    public void setPrice(Float price) {  this.price = price;  }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public byte[] getBookPhoto() { return bookPhoto; }
    public void setBookPhoto(byte[] bookPhoto) { this.bookPhoto = bookPhoto;  }


    public static BookSummary create(ResultSet rs) throws SQLException  {

        BookSummary summary = new BookSummary();

        summary.setBookTitle(rs.getString("title"));
        summary.setPrice(rs.getFloat("price"));
        summary.setId(rs.getInt("book_id"));
        summary.setBookPhoto(rs.getBytes("pic"));
   
        return summary;

    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
            .add("title", bookTitle)
            .add("price", price)
            .add("book_id", id)
            .add("pic", Base64.encodeBase64String(bookPhoto))
            .build();
    }
    
    
}
