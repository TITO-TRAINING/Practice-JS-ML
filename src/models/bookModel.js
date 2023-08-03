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

  /**
   * Adds a book to the collection of books.
   *
   * @param {object} bookData - The data of the book to be added.
   * @throws {Error} - If there was an error adding the book.
   */
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

  /**
   * Updates the book in the model with the provided information.
   * If the book is found in the model, it is replaced with the updated book.
   *
   * @param {Object} updatedBook - The updated book information.
   * @param {number} updatedBook.id - The ID of the book.
   * @param {string} updatedBook.title - The title of the book.
   * @param {string} updatedBook.author - The author of the book.
   * @param {string} updatedBook.category - The category of the book.
   * @param {number} updatedBook.publishedYear - The published year of the book.
   */
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

  /**
   * Updates the current book with the provided book data.
   * @param {object} bookData - The updated book data.
   * @throws {Error} If there is an error updating the book.
   */
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

  /**
   * Fetches books and updates the internal state.
   * If onDataChange callback is provided, it is called with the fetched books.
   * @throws {Error} If there is an error fetching the books.
   */
  async fetchBooks() {
    try {
      // Fetch books from bookService
      const res = await this.bookService.getAllBooks();
      const books = res.data;

      // Update internal state
      this.setBooks(books);

      // Call onDataChange callback if provided
      if (this.onDataChange) {
        this.onDataChange(this.getBooks());
      }
    } catch (error) {
      console.error('Error fetching books:', error);

      // Rethrow the error to be handled by the caller
      throw error;
    }
  }
}

export default BookModel;
