package com.practicebackend.wordbook.service;

import org.springframework.stereotype.Service;
import com.practicebackend.wordbook.repository.BookRepository;
import java.util.List;
import java.util.Optional;
import com.practicebackend.wordbook.entity.Book;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Add a new book with image URL
    public Book addBook(String name, String author, String publisher, String publicationDate) {
        return bookRepository.save(new Book(null, name, author, publisher, publicationDate, publicationDate));
    }

    // Get all books
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Get a book by ID
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    // Delete a book by ID
    public boolean deleteBook(Long id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Update a book by ID with optional image URL
    public boolean updateBook(Long id, String name, String author, String publisher, String publicationDate) {
        if (bookRepository.existsById(id)) {
            Book book = bookRepository.findById(id).get();
            book.setName(name);
            book.setAuthor(author);
            book.setPublisher(publisher);
            book.setPublicationDate(publicationDate);
            bookRepository.save(book);
            return true;
        }
        return false;
    }
}
