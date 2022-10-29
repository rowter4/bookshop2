package com.example.vttp.rowterbookshop.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vttp.rowterbookshop.model.BookSummary;
import com.example.vttp.rowterbookshop.service.BooksService;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
// import vttp2022.iss.book.backend.models.BookDetail;
// import vttp2022.iss.book.backend.models.BookSummary;
// import vttp2022.iss.book.backend.service.BooksService;

@RestController
@RequestMapping(path = "/book-summary")
public class BooksController {

    @Autowired
    private BooksService booksSvc;


    @GetMapping
    public ResponseEntity<String> getBooks() {

        List<BookSummary> summaries  = booksSvc.getBooks();

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();

        for (BookSummary summary: summaries)
            arrBuilder.add(summary.toJson());

        return ResponseEntity.ok(arrBuilder.build().toString());
    }

}
