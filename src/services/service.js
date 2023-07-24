import axios from 'axios';

const BASE_URL = 'http://localhost:3000/books';

class BookService {
  async getAllBooks() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error while fetching books:', error);
      throw error;
    }
  }

  async getBookById(bookId) {
    try {
      const response = await axios.get(`${BASE_URL}/${bookId}`);
      return response.data;
    } catch (error) {
      console.error('Error while fetching book by ID:', error);
      throw error;
    }
  }

  async addBook(book) {
    try {
      const response = await axios.post(BASE_URL, book);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  }

  async updateBook(bookId, updatedBook) {
    try {
      const response = await axios.put(`${BASE_URL}/${bookId}`, updatedBook);
      return response.data;
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  }

  async deleteBook(bookId) {
    try {
      await axios.delete(`${BASE_URL}/${bookId}`);
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  }
}

const bookService = new BookService();

export default bookService;
