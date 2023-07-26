import Book from './book';

class BookModel {
  constructor() {
    this.books = [];
    this.currentBook = null;
  }

  setBooks(books) {
    this.books = books.map((bookData) => {
      const { id, title, author, genre, publishedYear } = bookData;
      return new Book(id, title, author, genre, publishedYear);
    });
  }

  getBooks() {
    return this.books;
  }

  addBook(book) {
    this.books.push(book);
  }

  updateBook(updatedBook) {
    const index = this.books.findIndex((book) => book.id === updatedBook.id);
    if (index !== -1) {
      const { id, title, author, genre, publishedYear } = updatedBook;
      this.books[index] = new Book(id, title, author, genre, publishedYear);
    }
  }

  deleteBook(bookId) {
    this.books = this.books.filter((book) => book.id !== bookId);
  }
}

export default BookModel;
