import axios from 'axios';

// Base URL for backend
// const API_URL = 'https://wordbooks-3d5f2c4156c7.herokuapp.com/books';

const API_URL = 'http://localhost:8080/books';
const token = localStorage.getItem('token');

// Interface for Book type
export interface Book {
  imageUrl: string | number | readonly string[] | undefined;
  id?: number;
  name: string;
  author: string;
  publisher: string;
  publicationDate: string;
}

export const getAllBooks = async () => {
  
  if (!token) {
    alert("No token found, please login");
    return;
  }

  try {
    const response = await axios.get<Book[]>(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Response received but status is not 2xx
      console.error('Backend error:', error.response);
      alert(`Error: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      // Request was made, but no response received
      console.error('No response from backend:', error.request);
      alert('Network error: No response from server.');
    } else {
      // Other error (e.g., setting up the request)
      console.error('Error during request setup:', error.message);
      alert('Request setup error: ' + error.message);
    }
  }
};

// Add a new book
export const addBook = async (book: Book) => {
  if (!token) {
    alert("No token found, please login");
    return;
  }

  try {
    const response = await axios.post(API_URL, book, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Backend error:', error.response);
      alert(`Error: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      console.error('No response from backend:', error.request);
      alert('Network error: No response from server.');
    } else {
      console.error('Error during request setup:', error.message);
      alert('Request setup error: ' + error.message);
    }
  }
};

// Get a book by ID
export const getBookById = async (id: number) => {
  try {
    const response = await axios.get<Book>(`${API_URL}/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error; // Rethrow to handle later
  }
};

// Delete a book by ID
export const deleteBook = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.status === 204; // Success if status is 204 (No Content)
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error; // Rethrow to handle later
  }
};


export const updateBook = async (id: number, book: Partial<Book>) => {
    try{
        const response = await axios.put(`${API_URL}/${id}`, book, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating book:", error);
        throw error; // Rethrow to handle later
    }
};