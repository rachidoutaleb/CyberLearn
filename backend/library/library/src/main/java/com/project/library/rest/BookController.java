package com.project.library.rest;


import com.project.library.model.Book;
import com.project.library.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping({"","/"})
    public List<Book> showBookList() {
        return bookService.getAllBooks();
    }


    @GetMapping("/getAll")
    public List<Book> list() {
        return bookService.getAllBooks();
    }
}

