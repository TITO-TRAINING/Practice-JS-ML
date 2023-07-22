import BookService from '../services/service';

class BookController {
  constructor() {
    this.books = [];
    this.currentBook = null;
  }

  setView(formView, listView) {
    this.formView = formView;
    this.listView = listView;
  }

  async handleFormSubmit(title, author, genre, publishedYear) {
    if (this.currentBook) {
      await this.updateBook(title, author, genre, publishedYear);
    } else {
      await this.addBook(title, author, genre, publishedYear);
    }

    try {
      await this.fetchBooks();
      this.formView.clearForm();
      this.formView.showSuccessMessage('Book saved successfully.');
      this.currentBook = null; // Reset currentBook after successful update or add
      this.formView.render(); // Render the form with the updated state (Add button)
    } catch (error) {
      this.formView.showErrorMessage('Error fetching books. Please try again.');
    }
  }

  async handleEdit(bookId) {
    try {
      const foundBook = await BookService.getBookById(bookId);
      if (foundBook) {
        this.currentBook = foundBook;
        this.formView.render(this.currentBook); // Render with the book data if available
      } else {
        this.formView.showErrorMessage('Book not found or invalid bookId.');
      }
    } catch (error) {
      this.formView.showErrorMessage(
        'Error while fetching book. Please try again.',
      );
    }
  }

  async handleDelete(bookId) {
    try {
      await BookService.deleteBook(bookId);
      await this.fetchBooks();
      this.listView.showSuccessMessage('Book deleted successfully.');
    } catch (error) {
      this.listView.showErrorMessage(
        'Error while deleting book. Please try again.',
      );
    }
  }

  async addBook(title, author, genre, publishedYear) {
    try {
      const newBook = await BookService.addBook({
        title,
        author,
        genre,
        publishedYear,
      });
      this.books.push(newBook);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  }

  async updateBook(title, author, genre, publishedYear) {
    if (this.currentBook) {
      try {
        const updatedBook = {
          ...this.currentBook,
          title,
          author,
          genre,
          publishedYear,
        };
        await BookService.updateBook(this.currentBook.id, updatedBook);
        this.currentBook = null;
      } catch (error) {
        console.error('Error updating book:', error);
      }
    }
  }

  async fetchBooks() {
    try {
      this.books = await BookService.getAllBooks();
      if (this.listView) {
        this.listView.render();
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }
}

export default BookController;
