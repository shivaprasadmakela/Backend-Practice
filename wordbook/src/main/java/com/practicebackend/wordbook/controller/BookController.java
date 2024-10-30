package com.practicebackend.wordbook.controller;
import com.practicebackend.wordbook.entity.Book;
import com.practicebackend.wordbook.service.BookService;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;


@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // Create a new book
    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        Book newBook = bookService.addBook(book.getName(), book.getAuthor(), book.getPublisher(), book.getPublicationDate()); // Pass the book's name and author
        return ResponseEntity.status(201).body(newBook);
    }

    // Get all books
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    // Get a book by ID
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a book by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        boolean deleted = bookService.deleteBook(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Boolean> updateBook(
            @PathVariable Long id,
            @RequestBody Book updatedBookData
    ) {
        boolean updated = bookService.updateBook(
                id,
                updatedBookData.getName(),
                updatedBookData.getAuthor(),
                updatedBookData.getPublisher(),
                updatedBookData.getPublicationDate()
                
        );

        if (updated) {
            return ResponseEntity.ok(true); // Return true if update was successful
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if the book was not found
        }
    }

}
