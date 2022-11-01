package com.example.vttp.rowterbookshop.controller;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.vttp.rowterbookshop.model.BookDetail;
import com.example.vttp.rowterbookshop.model.BookSummary;
import com.example.vttp.rowterbookshop.model.UserResponse;
import com.example.vttp.rowterbookshop.repo.BooksRepository;
import com.example.vttp.rowterbookshop.service.BooksService;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

@RestController
@RequestMapping
public class BooksController {

    @Autowired
    private BooksService booksSvc;

    @Autowired
    private BooksRepository bookRepo;

    Logger logger = Logger.getLogger(BooksController.class.getName());

    @GetMapping(path = "/book-summary")
    public ResponseEntity<String> getBooks() {

        List<BookSummary> summaries = booksSvc.getBooks();

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();

        for (BookSummary summary: summaries)
            arrBuilder.add(summary.toJson());

        return ResponseEntity.ok(arrBuilder.build().toString());
    }

    

    @GetMapping(path="/book-detail/{bookId}")
    public ResponseEntity<String> getBookById(@PathVariable String bookId) {

        Optional<BookDetail> opt = booksSvc.getBookById(bookId);

        logger.info("Book ID being passed : %s".formatted(bookId));


        if (opt.isEmpty()) {
            UserResponse response = new UserResponse();
            response.setStatus(404);
            response.setMessage("Unable to retrieve book detail from book detail");

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body(response.toJson().toString());

        } else {
            BookDetail detail = opt.get();

            return ResponseEntity
                .status(HttpStatus.OK)
                .body(detail.toJson().toString());
        }

        
    }

    @PostMapping(path="/upload" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> newBookUpload(@RequestPart MultipartFile file, @RequestPart String form) {

        boolean upload;

        System.out.printf("form passed to springboot: %s \n", form);
        System.out.printf("myfile passed to springboot: %s \n", file);

        BookDetail newBook = new BookDetail();
        newBook = BookDetail.create(form);

        upload = bookRepo.insertNewBook(file, newBook);

        if (upload) {
            JsonObject data = Json.createObjectBuilder()
                .add("content-type", file.getContentType())
                .add("name", file.getName())
                .add("original_name", file.getOriginalFilename())
                .add("size", file.getSize())
                .build();

            return ResponseEntity.ok(data.toString());

        } else {
            UserResponse resp = new UserResponse();
            resp.setStatus(400);
            resp.setMessage(">>>> unable to add new book ");
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(resp.toJson().toString());
        }
    }


    @DeleteMapping(value = "/book-summary/{bookId}")
    public ResponseEntity<String> deleteBookFromRepo(@PathVariable String bookId) {

        Optional<String> opt = booksSvc.deleteBookById(bookId);

        logger.info("Book ID being passed for delete : %s".formatted(bookId));


        if (opt.isEmpty()) {
            UserResponse response = new UserResponse();
            response.setStatus(404);
            response.setMessage("Unable to retrieve book detail from book detail");

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body(response.toJson().toString());

        } else {
            // String status = opt.get();

            // UserResponse response = new UserResponse();
            // response.setStatus(204);
            // response.setMessage(status);

            // return ResponseEntity.status(HttpStatus.NOT_FOUND)
            //                     .body(response.toJson().toString());

            return new ResponseEntity<>(bookId, HttpStatus.NO_CONTENT);

        }
    }

}
