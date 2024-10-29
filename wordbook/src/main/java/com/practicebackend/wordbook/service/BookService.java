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

    public Book addBook(String name, String author, String publisher, String publicationDate) { // Accept name and author as parameters
        return bookRepository.save(new Book(null, name, author,publisher, publicationDate)); // Now it will work
    }
    

    // Get all books
    public List<Book> getAllBooks() { // Changed method name to getAllBooks
        return bookRepository.findAll();
    }

    // Get a book by ID
    public Optional<Book> getBookById(Long id) { // Changed method name to getBookById
        return bookRepository.findById(id);
    }

    // Delete a book by ID
public boolean deleteBook(Long id) {
    if (bookRepository.existsById(id)) { // Check if the book exists
        bookRepository.deleteById(id);
        return true; // Return true if deletion was successful
    }
    return false; // Return false if the book did not exist
}

}
