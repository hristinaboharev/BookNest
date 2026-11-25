
package com.booknest.booknest.service;

import com.booknest.booknest.model.Book;
import com.booknest.booknest.model.Author;
import com.booknest.booknest.model.Genre;

import com.booknest.booknest.repository.BookRepository;
import com.booknest.booknest.repository.AuthorRepository;
import com.booknest.booknest.repository.GenreRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;

    public BookService(
            BookRepository bookRepository,
            AuthorRepository authorRepository,
            GenreRepository genreRepository) {

        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.genreRepository = genreRepository;
    }

    // Pronalaženje autora ili kreiranje novog
    private Author findOrCreateAuthor(Author author) {

        if (author == null || author.getName() == null
                || author.getName().isBlank()) {
            throw new IllegalArgumentException("Author name is required");
        }

        String name = author.getName().trim();

        return authorRepository.findByName(name)
                .orElseGet(() -> authorRepository.save(
                        new Author(name, author.getBiography())
                ));
    }

    // Pronalaženje žanra ili kreiranje novog
    private Genre findOrCreateGenre(Genre genre) {

        if (genre == null || genre.getName() == null
                || genre.getName().isBlank()) {
            throw new IllegalArgumentException("Genre name is required");
        }

        String name = genre.getName().trim();

        return genreRepository.findByName(name)
                .orElseGet(() -> genreRepository.save(
                        new Genre(name, genre.getDescription())
                ));
    }

    // Dodavanje više knjiga
    public List<Book> saveAllBooks(List<Book> books) {

        for (Book book : books) {
            book.setAuthor(findOrCreateAuthor(book.getAuthor()));
            book.setGenre(findOrCreateGenre(book.getGenre()));
        }

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

        book.setAuthor(findOrCreateAuthor(book.getAuthor()));
        book.setGenre(findOrCreateGenre(book.getGenre()));

        return bookRepository.save(book);
    }

    // Brisanje knjige
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    // Brisanje svih knjiga
    public void deleteAllBooks() {
        bookRepository.deleteAll();
    }
}
