package com.example.vttp.rowterbookshop.model;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObject;

import java.text.DateFormat;  
import java.text.SimpleDateFormat;  
import java.util.Date;  


public class BookOrderHistory {
    
    private String ord_id; 
    private String total;
    private Date ts;

    public String getOrd_id() { return ord_id; }
    public void setOrd_id(String ord_id) { this.ord_id = ord_id; }

    public String getTotal() { return total; }
    public void setTotal(String total) { this.total = total; }

    public Date getTs() { return ts;  }
    public void setTs(Date ts) { this.ts = ts; }
    

    public static BookOrderHistory create(SqlRowSet rs) {

        BookOrderHistory history = new BookOrderHistory();

        history.setOrd_id(rs.getString("ord_id"));
        history.setTotal(rs.getString("total"));
        history.setTs(rs.getDate("ts"));

        return history;
    }
    

    public JsonObject toJson() {

        DateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy HH:mm:ss");  
        String strDate = dateFormat.format(ts);  

        return Json.createObjectBuilder()
            .add("ord_id", ord_id)
            .add("total", total)
            .add("ts", strDate)
            .build();
    }
}
