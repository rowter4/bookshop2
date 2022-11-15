package com.example.vttp.rowterbookshop.repo;

public interface Queries {

    // to be used below:
    public static final String SQL_GET_USER_FROM_EMAIL = "select * from user where email like ?";
    public static final String SQL_INSERT_NEW_USER = "insert into user (userId,email,password,name) values (?,?,?,?)";  
    public static final String SQL_GET_USER_LOGIN = "select count(*) as user_count from user where email = ? and password = sha1(?)";                     
    public static final String SQL_UPDATE_TOKEN = "update user set reset_password_token = ? where email = ?";
    public static final String SQL_UPDATE_PASSWORD = "update user set password = ? where reset_password_token = ?";
    public static final String SQL_GET_USER_FROM_TOKEN = "select * from user where reset_password_token = ?";
    
    // setting up for getting and inserting books
    public static final String SQL_INSERT_NEW_BOOK =  "insert into book_details(added_by, genre , title, edition , authors , format,  description, price, pages, rating, pic) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    public static final String SQL_GET_ALL_BOOKS =  "select * from book_details";
    public static final String SQL_BOOKS_BY_ID =  "select * from book_details where book_id = ?";
    public static final String SQL_DELETE_BOOK_BY_BOOK_ID = "delete from book_details where book_id = ?";

    // handling the orders that comes in 
    public static final String SQL_INSERT_LINE_ITEM = "insert into line_item(title, quantity, price, ord_id, email) values (?, ?, ?, ?, ?)";
    public static final String SQL_INSERT_ORDER_DETAILS = "insert into order_summary(ord_id, email, total, ts) values (?,?,?, CURRENT_TIMESTAMP) " ;

    // getting the past order information 
    public static final String SQL_GET_ORDER_HISTORY = " select * from order_summary where email = ?"; 
    public static final String SQL_GET_ITEMS_BY_ORD_ID = "select * from line_item where ord_id = ?"; 
}
    
