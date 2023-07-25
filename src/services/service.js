import axios from 'axios';
import Toast from '../views/Toast';

const BASE_URL = 'http://localhost:3000/books';

class BookService {
  static async getAllBooks() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error while fetching books:', error);
      Toast.show('Error while fetching books. Please try again.', 'error');
      throw error;
    }
  }

  static async getBookById(bookId) {
    try {
      const response = await axios.get(`${BASE_URL}/${bookId}`);
      return response.data;
    } catch (error) {
      console.error('Error while fetching book by ID:', error);
      Toast.show('Error while fetching book. Please try again.', 'error');
      throw error;
    }
  }

  static async addBook(book) {
    try {
      const response = await axios.post(BASE_URL, book);
      Toast.show('Book added successfully.', 'success');
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      Toast.show('Error adding book. Please try again.', 'error');
      throw error;
    }
  }
  static async updateBook(bookId, updatedBook) {
    try {
      const response = await axios.put(`${BASE_URL}/${bookId}`, updatedBook);
      Toast.show('Book updated successfully.', 'success');
      return response.data;
    } catch (error) {
      console.error('Error updating book:', error);
      Toast.show('Error updating book. Please try again.', 'error');
      throw error;
    }
  }

  static async deleteBook(bookId) {
    try {
      await axios.delete(`${BASE_URL}/${bookId}`);
    } catch (error) {
      console.error('Error deleting book:', error);
      Toast.show('Error deleting book. Please try again.', 'error');
      throw error;
    }
  }
}

export default BookService;
