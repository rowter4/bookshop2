package com.example.vttp.rowterbookshop.repo;

public interface Queries {

    // setting up for admin
    public static final String SQL_SELECT_ADMIN_USER = "select count(*) as user_count from admin_users where username = ? and password = sha1(?)";
    
    // setting up for getting and inserting books
    public static final String SQL_INSERT_NEW_BOOK =  "insert into book_details(added_by, genres , title, edition , authors , format,  description, price, pages, rating, pic) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    public static final String SQL_GET_ALL_BOOKS =  "select * from book_details";
    public static final String SQL_BOOKS_BY_ID =  "select * from book_details where book_id = ?";


    // handling the orders that comes in 
    public static final String SQL_INSERT_LINE_ITEM = "insert into line_item(title, quantity, price, ord_id, username) values (?, ?, ?, ?, ?)";
    public static final String SQL_INSERT_ORDER_DETAILS = "insert into order_summary(ord_id, username, total, ts) values (?,?,?, CURRENT_TIMESTAMP) " ;

    // getting the past order information 
    public static final String SQL_GET_ORDER_HISTORY = " select * from order_summary where username = ?"; 
    public static final String SQL_GET_ITEMS_BY_ORD_ID = "select * from line_item where ord_id = ?"; 
}
    
