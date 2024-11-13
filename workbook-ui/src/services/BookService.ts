import axios from 'axios';

// Base URL for backend
const API_URL = 'https://wordbooks-3d5f2c4156c7.herokuapp.com/books';

// Interface for Book type
export interface Book {
  imageUrl: string | number | readonly string[] | undefined;
  id?: number;
  name: string;
  author: string;
  publisher: string;
  publicationDate: string;
}

// Fetch all books
export const getAllBooks = async () => {
  try {
    const response = await axios.get<Book[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error; // Rethrow to handle later
  }
};

// Add a new book
export const addBook = async (book: Book) => {
  try {
    const response = await axios.post<Book>(API_URL, book);
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error; // Rethrow to handle later
  }
};

// Get a book by ID
export const getBookById = async (id: number) => {
  try {
    const response = await axios.get<Book>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error; // Rethrow to handle later
  }
};

// Delete a book by ID
export const deleteBook = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.status === 204; // Success if status is 204 (No Content)
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error; // Rethrow to handle later
  }
};


export const updateBook = async (id: number, book: Partial<Book>) => {
    try{
        const response = await axios.put(`${API_URL}/${id}`, book);
        return response.data;
    } catch (error) {
        console.error("Error updating book:", error);
        throw error; // Rethrow to handle later
    }
};