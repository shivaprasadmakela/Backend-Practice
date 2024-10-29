package com.practicebackend.wordbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.practicebackend.wordbook.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // No additional code is needed here; JpaRepository provides all CRUD operations
}
