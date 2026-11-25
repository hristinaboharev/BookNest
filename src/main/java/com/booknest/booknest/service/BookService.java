
package com.booknest.booknest.service;

import com.booknest.booknest.model.Book;
import com.booknest.booknest.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> saveAllBooks(List<Book> books) {
        return bookRepository.saveAll(books);
    }


    // Prikaz svih knjiga
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Pronalaženje knjige po ID-u
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    // Dodavanje nove knjige
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    // Brisanje knjige
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    public void deleteAllBooks() {
        bookRepository.deleteAll();
    }
}
