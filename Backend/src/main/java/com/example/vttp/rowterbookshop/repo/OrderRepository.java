package com.example.vttp.rowterbookshop.repo;

import java.util.LinkedList;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.example.vttp.rowterbookshop.model.BookOrderHistory;
import com.example.vttp.rowterbookshop.model.LineItem;

// import vttp2022.iss.book.backend.models.BookOrderHistory;

// import vttp2022.iss.book.backend.models.LineItem;
import static com.example.vttp.rowterbookshop.repo.Queries.*;

@Repository
public class OrderRepository {

    @Autowired
    private JdbcTemplate template;

    private Logger logger = Logger.getLogger(OrderRepository.class.getName());

    public boolean insertLineItems(String orderId, List<LineItem> lineItems, String username) {
        logger.info("insertOverallOrder Fired");
        for (LineItem li : lineItems)
            if (!insertBookOrder(orderId, li, username))
                return false;
        return true;
    }

    public boolean insertBookOrder(String orderId, LineItem li, String username) {
        // insert into line_item(title, quantity, price, ord_id, username) values (?, ?, ?, ?, ?)";
        // logger.info("insertBookFired with username of %d and quantity of %d and price of %s".formatted(orderId, li.getTitle(), li.getPrice()));
        logger.info("insertBook Details %s - %s - %s - %s - %s ".formatted(li.getTitle(), li.getQuantity(), li.getPrice(), orderId, username));
        int count = template.update(SQL_INSERT_LINE_ITEM, li.getTitle(), li.getQuantity(), li.getPrice(), orderId, username);
        return 1 == count;
    }

   

    public List<LineItem> getOrderByOrdId(String ord_id) {

        SqlRowSet rs = template.queryForRowSet(SQL_GET_ITEMS_BY_ORD_ID, ord_id);
        logger.info("result obtained obtained :  %s".formatted(rs));
        List<LineItem> itemLists = new LinkedList<>();

        while (rs.next()) {
            LineItem aBook = LineItem.create2(rs);
            logger.info("aBook obtained :  %s".formatted(aBook));
            itemLists.add(aBook);
        }

        logger.info("itemList obtained :  %s".formatted(itemLists));
        return itemLists;
    }

    public boolean insertSummaryOrderDetails(String orderId, String username, String grandTotal ) {
        logger.info(">>>>> orderId for order Details obtained :  %s \n ".formatted(orderId));
        logger.info(">>>>> username for order Details obtained :  %s \n ".formatted(username));
        logger.info(">>>>> total obtained :  %s".formatted(grandTotal));
        int count = template.update(SQL_INSERT_ORDER_DETAILS, orderId, username, grandTotal);
        return 1 == count;
    }

    public List<BookOrderHistory> getAllOrder(String username) {

        SqlRowSet rs = template.queryForRowSet(SQL_GET_ORDER_HISTORY,username);
        List<BookOrderHistory> bookOrderList = new LinkedList<>();

        while (rs.next()) {
            BookOrderHistory bookHistory = BookOrderHistory.create(rs);
            bookOrderList.add(bookHistory);
        }

        return bookOrderList;
       
    }
}
