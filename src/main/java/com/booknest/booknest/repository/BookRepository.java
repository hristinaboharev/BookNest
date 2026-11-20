package com.booknest.booknest.repository;

import com.booknest.booknest.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BookRepository extends JpaRepository<Book, Long> {
}
