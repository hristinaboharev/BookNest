
package com.booknest.booknest.controller;

import com.booknest.booknest.model.Book;
import com.booknest.booknest.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // Prikaz svih knjiga
    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    // Prikaz jedne knjige po ID-u
    @GetMapping("/{id}")
    public Optional<Book> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    // Dodavanje nove knjige
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookService.saveBook(book);
    }

    @PostMapping("/bulk")
    public List<Book> addBooks(@RequestBody List<Book> books) {
        return bookService.saveAllBooks(books);
    }


    // Izmena postojeće knjige
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id,
                           @RequestBody Book book) {

        book.setId(id);
        return bookService.saveBook(book);
    }

    // Brisanje knjige
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
    }
}
