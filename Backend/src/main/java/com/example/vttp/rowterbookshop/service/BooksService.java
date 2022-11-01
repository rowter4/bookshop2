package com.example.vttp.rowterbookshop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vttp.rowterbookshop.model.BookDetail;
import com.example.vttp.rowterbookshop.model.BookSummary;
import com.example.vttp.rowterbookshop.repo.BooksRepository;


@Service
public class BooksService {

    @Autowired
    private BooksRepository bookRepo;

    public List<BookSummary> getBooks() {
        return bookRepo.getBooks();
    }
    
    public Optional<BookDetail> getBookById(String bookId) {
        return bookRepo.getBookById(bookId);
    } 

    public Optional<String> deleteBookById(String bookId) {
        return bookRepo.deleteBookById(bookId);
    } 

    // public Optional<String> getNameFromEmail(String email) {
    //     return bookRepo.getNameFromEmail(email);
    // } 
}
