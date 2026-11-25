
package com.booknest.booknest.controller;

import com.booknest.booknest.model.Book;
import com.booknest.booknest.service.BookService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
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
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {

        Optional<Book> book = bookService.getBookById(id);

        return book.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Dodavanje nove knjige
    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(bookService.saveBook(book));
    }

    // Dodavanje više knjiga
    @PostMapping("/bulk")
    public ResponseEntity<List<Book>> addBooks(
            @RequestBody List<Book> books) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(bookService.saveAllBooks(books));
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
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {

        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    // Brisanje svih knjiga
    @DeleteMapping
    public ResponseEntity<Void> deleteAllBooks() {

        bookService.deleteAllBooks();
        return ResponseEntity.noContent().build();
    }
}
