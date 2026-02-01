import React, { useState, useEffect } from 'react';
import { addBook, Book, getAllBooks, deleteBook, updateBook } from '../services/BookService';
import './BooksList.css';

const AddBook: React.FC = () => {
  const [book, setBook] = useState<Book>({ name: '', author: '', publisher: '', publicationDate: '', imageUrl: '' });
  const [books, setBooks] = useState<Book[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editingBookId, setEditingBookId] = useState<number | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getAllBooks();
      setBooks(data || []);  // Ensure data is an array
    };
    fetchBooks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setBook(prevState => ({
  //         ...prevState,
  //         imageUrl: reader.result as string,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (book.name && book.author) {
      if (editMode && editingBookId !== null) {
        await updateBook(editingBookId, book);
        const updatedBooks = books.map(b => (b.id === editingBookId ? { ...book, id: editingBookId } : b));
        setBooks(updatedBooks);
        alert('Book updated successfully!');
      } else {
        const savedBook = await addBook(book);
        setBooks(prev => [...prev, savedBook]);
        alert('Book added successfully!');
      }
      setBook({ name: '', author: '', publisher: '', publicationDate: '', imageUrl: '' });
      setEditMode(false);
      setEditingBookId(null);
    }
  };

  const handleEdit = (book: Book) => {
    setBook(book);
    setEditMode(true);
    setEditingBookId(book.id || null);
  };

  const handleDelete = async (id: number) => {
    await deleteBook(id);
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
  };

  return (
    <>
    <button onClick={handilLogOut} className='SubmitButton'>Logout</button>
      <div>
        <h2>{editMode ? 'Edit Book' : 'Add New Book'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            className='inputBox'
            type="text"
            name="name"
            value={book.name}
            placeholder="Book Name"
            onChange={handleChange}
            required
          />
          <input
            className='inputBox'
            type="text"
            name="author"
            value={book.author}
            placeholder="Author Name"
            onChange={handleChange}
            required
          />
          <input
            className='inputBox'
            type="text"
            name="publisher"
            value={book.publisher}
            placeholder="Publisher"
            onChange={handleChange}
            required
          />
          <input
            className='inputBox'
            type="text"
            name="publicationDate"
            value={book.publicationDate}
            placeholder="Publication Date"
            onChange={handleChange}
            required
          />
          {/* <input
            className='inputBox'
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          /> */}

          <button className='SubmitButton' type="submit">
            {editMode ? 'Save Changes' : 'Add Book'}
          </button>
        </form>
      </div>

      <div>
        <h2>Book List</h2>
        <ul>
          {books.map(book => (
            <li key={book.id} className='book-list-item'>
              <div>
                <p>ID: {book.id}</p>
                <h2>Book Name: {book.name}</h2>
                <h4>Book Author: {book.author}</h4>
                <p>Publisher: {book.publisher}</p>
                <p>Publication Date: {book.publicationDate}</p>
              </div>
              <div>
                <img onClick={() => handleDelete(book.id!)} className='deleteIcon' src={process.env.PUBLIC_URL + "asserts/bin_484611.png"} alt="deleteIcon" />
                <img onClick={() => handleEdit(book)} className='deleteIcon' src={process.env.PUBLIC_URL + "asserts/ui-element_15768411.png"} alt="editIcon" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AddBook;
