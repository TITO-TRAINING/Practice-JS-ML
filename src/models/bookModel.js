import Book from './book';
import BookService from '../api/BookApi';

class BookModel {
  constructor() {
    this.books = [];
    this.currentBook = null;
    this.bookService = new BookService(); // Create an instance of BookService
  }

  setBooks(books) {
    this.books = books.map((bookData) => {
      const { id, title, author, category, publishedYear } = bookData;
      return new Book(id, title, author, category, publishedYear);
    });
  }

  getBooks() {
    return this.books;
  }

  async addBook(title, author, category, publishedYear) {
    try {
      const newBook = await this.bookService.addBook({
        title,
        author,
        category,
        publishedYear,
      });
      this.books.push(newBook);
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  }

  async updateBook(title, author, category, publishedYear) {
    const currentBook = this.currentBook;

    // Check if there is a current book
    if (currentBook) {
      // Create an updated book object with the new information
      try {
        const updatedBook = {
          ...currentBook,
          title,
          author,
          category,
          publishedYear,
        };

        await this.bookService.updateBook(currentBook.id, updatedBook);
        this.updateBookInModel(updatedBook); // Use a separate method to update book in the model
      } catch (error) {
        console.error('Error updating book:', error);
        throw error;
      }
    }
  }

  async deleteBook(bookId) {
    try {
      await this.bookService.deleteBook(bookId);
      this.books = this.books.filter((book) => book.id !== bookId);
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  }

  updateBookInModel(updatedBook) {
    const index = this.books.findIndex((book) => book.id === updatedBook.id);
    if (index !== -1) {
      const { id, title, author, category, publishedYear } = updatedBook;
      this.books[index] = new Book(id, title, author, category, publishedYear);
    }
  }

  async fetchBooks() {
    try {
      const res = await this.bookService.getAllBooks();
      const books = res.data;
      this.setBooks(books);

      this.onDataChange && this.onDataChange(this.getBooks());
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }
}

export default BookModel;
