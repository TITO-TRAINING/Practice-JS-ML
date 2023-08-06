import Book from './book';

class BookModel {
  constructor(bookService) {
    this.bookService = bookService;
    this.books = [];
    this.currentBook = null;
    this.onDataChange = [];
  }

  setBooks(books) {
    this.books = books.map(
      ({ id, title, author, category, publishedYear }) =>
        new Book(id, title, author, category, publishedYear),
    );
  }

  getBooks() {
    return this.books;
  }

  async addBook(bookData) {
    try {
      const newBook = await this.bookService.addBook(bookData);
      this.books.push(newBook);
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  }

  updateBookInModel(updatedBook) {
    const index = this.books.findIndex((book) => book.id === updatedBook.id);
    if (index !== -1) {
      const { id, title, author, category, publishedYear } = updatedBook;
      const updatedBookInstance = new Book(
        id,
        title,
        author,
        category,
        publishedYear,
      );
      this.books.splice(index, 1, updatedBookInstance);
    }
  }

  async updateBook(bookData) {
    const currentBook = this.currentBook;
    if (currentBook) {
      try {
        const updatedBook = { ...currentBook, ...bookData };
        await this.bookService.updateBook(currentBook.id, updatedBook);
        this.updateBookInModel(updatedBook);
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

  async Edit(bookId) {
    try {
      const { data } = await this.bookService.getBookById(bookId);
      this.currentBook = data
        ? data
        : console.error('Book not found or invalid bookId.');
    } catch (error) {
      console.error('Error while fetching book. Please try again.');
    }
  }

  async searchBooks(searchTerm) {
    try {
      const filteredBooks = this.books.filter((book) => {
        return (
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.publishedYear.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      return filteredBooks;
    } catch (error) {
      console.error('Error searching books:', error);
      throw error;
    }
  }

  async fetchBooks() {
    try {
      const res = await this.bookService.getAllBooks();
      const books = res.data;
      this.setBooks(books);
      if (this.onDataChange) {
        this.onDataChange(this.getBooks());
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }
}

export default BookModel;
