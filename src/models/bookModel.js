import Book from './book';

class BookModel {
  constructor(bookService) {
    this.bookService = bookService;
    this.books = [];
    this.currentBook = null;
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
      // Add the book using the bookService
      const newBook = await this.bookService.addBook(bookData);
      // Push the new book to the books collection
      this.books.push(newBook);
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  }

  updateBookInModel(updatedBook) {
    // Find the index of the book in the model
    const index = this.books.findIndex((book) => book.id === updatedBook.id);

    // If the book is found in the model
    if (index !== -1) {
      // Create a new instance of the Book class with the updated information
      const { id, title, author, category, publishedYear } = updatedBook;
      const updatedBookInstance = new Book(
        id,
        title,
        author,
        category,
        publishedYear,
      );

      // Replace the book at the found index with the updated book instance
      this.books.splice(index, 1, updatedBookInstance);
    }
  }

  async updateBook(bookData) {
    const currentBook = this.currentBook;

    // Check if there is a current book
    if (currentBook) {
      try {
        // Create an updated book object by merging the current book with the provided book data
        const updatedBook = {
          ...currentBook,
          ...bookData,
        };
        // Update the book in the book service
        await this.bookService.updateBook(currentBook.id, updatedBook);
        // Update the book in the model
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

  async fetchBooks() {
    try {
      // Fetch books from bookService
      const res = await this.bookService.getAllBooks();
      const books = res.data;
      this.setBooks(books);
      // Call onDataChange callback if provided
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
