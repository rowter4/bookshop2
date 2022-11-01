package com.example.vttp.rowterbookshop.repo;

import java.sql.ResultSet;
// import java.sql.SQLException;
// import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
// import org.springframework.jdbc.core.ResultSetExtractor;
// import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

// import com.mysql.cj.xdevapi.Result;
import com.example.vttp.rowterbookshop.model.BookDetail;
// import vttp2022.iss.book.backend.models.BookDetail;
import com.example.vttp.rowterbookshop.model.BookSummary;

import static com.example.vttp.rowterbookshop.repo.Queries.*;

@Repository
public class BooksRepository {

    @Autowired
    private JdbcTemplate template;

    Logger logger = Logger.getLogger(BooksRepository.class.getName());

    public List<BookSummary> getBooks() {

        List<BookSummary> opt =  template.query(SQL_GET_ALL_BOOKS,
                (ResultSet rs) -> {
                    List<BookSummary> summaries = new LinkedList<>(); 
                    while (rs.next()) {
                        BookSummary summary = new BookSummary();

                        summary.setBookTitle(rs.getString("title"));
                        summary.setId(rs.getInt("book_id"));
                        summary.setPrice(rs.getFloat("price"));
                        summary.setBookPhoto(rs.getBytes("pic"));

                        summaries.add(summary);

                    }
                    
                    return summaries;
                    
                });
                
        return opt;
    }

    public Optional<BookDetail> getBookById(String bookId) {

        logger.info("Book ID being passed into repository : %s".formatted(bookId));

        
        return template.query(SQL_BOOKS_BY_ID,
                (ResultSet rs) -> {
                    if (!rs.next())
                        return Optional.empty();
                    return Optional.of(BookDetail.create(rs));
                },
                bookId);

    }

    public Optional<String> deleteBookById(String bookId) {

        logger.info("Book ID being passed into repository : %s".formatted(bookId));

        int result2 = template.update(SQL_DELETE_BOOK_BY_BOOK_ID, bookId);

        if (result2 == 1) {
            String result = "Book Data Deleted";
            return Optional.of(result);    
        }

        String result = "Book Data Unsuccessful to Delete";
        return Optional.of(result);

    }

    // public Optional<String> getNameFromEmail(String email) {

    //     // logger.info("Book ID being passed into repository : %s".formatted(bookId));

    //     SqlRowSet rs = template.queryForRowSet(SQL_GET_NAME_FROM_USER,email);
        
    //     return null;
    //     // return template.query(SQL_BOOKS_BY_ID,
    //     //         (ResultSet rs) -> {
    //     //             if (!rs.next())
    //     //                 return Optional.empty();
    //     //             return Optional.of(BookDetail.create(rs));
    //     //         },
    //     //         bookId);

    // }

    public boolean insertNewBook(MultipartFile file, BookDetail formDetails) {

        System.out.printf(">>>>>>>>> form read inside repo: %s \n", formDetails);
        System.out.printf(">>>>>>>>>>> myfile read in repo: %s \n", file);

        System.out.printf(">>>>>>>>> pages read inside repo: %s \n", formDetails.getPages());
        System.out.printf(">>>>>>>>> pages read inside repo: %f \n", formDetails.getPrice());

        try {
           
            int updated = template.update(SQL_INSERT_NEW_BOOK, formDetails.getUsername(), formDetails.getGenre(), formDetails.getBookTitle()
                                            , formDetails.getEdition(), formDetails.getAuthors(), formDetails.getFormat(), formDetails.getDescription(), 
                                            formDetails.getPrice(), formDetails.getPages(), formDetails.getRating(), file.getInputStream() );
            
            return 1 == updated;
            
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return false;
    }
}
