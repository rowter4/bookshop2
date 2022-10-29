package com.example.vttp.rowterbookshop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vttp.rowterbookshop.model.BookSummary;
import com.example.vttp.rowterbookshop.repo.BooksRepository;

// import vttp2022.iss.book.backend.models.BookDetail;
// import vttp2022.iss.book.backend.models.BookSummary;
// import vttp2022.iss.book.backend.repository.GetBooksRepository;

@Service
public class BooksService {

    @Autowired
    private BooksRepository bookRepo;

    public List<BookSummary> getBooks() {
        return bookRepo.getBooks();
    }
    
    // public Optional<BookDetail> getBookById(String bookId) {
    //     return getBookRepo.getBookById(bookId);
    // } 
}
