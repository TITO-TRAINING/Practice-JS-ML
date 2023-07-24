import BookModel from '../models/bookModel';
import BookService from '../api/BookApi';
import BookFormView from '../views/BookFormView ';
import BookListView from '../views/BookListView';

class BookController {
  constructor() {
    this.model = new BookModel();
    this.formView = new BookFormView(this);
    this.listView = new BookListView(this);
    this.bookService = new BookService();

    this.formView.setOnSubmit(this.handleFormSubmit.bind(this));
    this.listView.setOnEdit(this.handleEdit.bind(this));
    this.listView.setOnDelete(this.handleDelete.bind(this));
  }

  async handleFormSubmit(title, author, genre, publishedYear) {
    try {
      if (this.model.currentBook) {
        await this.updateBook(title, author, genre, publishedYear);
      } else {
        await this.addBook(title, author, genre, publishedYear);
      }

      await this.fetchBooks();
      this.formView.clearForm();
      this.formView.showSuccessMessage('Book saved successfully.');
      this.model.currentBook = null; // Reset currentBook after successful update or add
      this.formView.render(); // Render the form with the updated state (Add button)
    } catch (error) {
      this.formView.showErrorMessage('Error saving book. Please try again.');
    }
  }

  async handleEdit(bookId) {
    try {
      var foundBook = null;
      await this.bookService
        .getBookById(bookId)
        .then((res) => {
          foundBook = res.data;
        })
        .catch((e) => {
          console.log('Error when get book by id ', e);
        });
      if (foundBook) {
        this.model.currentBook = foundBook;
        this.formView.render(this.model.currentBook);
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
      await this.bookService.deleteBook(bookId).catch((e) => {
        console.log('Error when delete book', e);
      });
      this.model.deleteBook(bookId);
      this.listView.showSuccessMessage('Book deleted successfully.');
      await this.fetchBooks();
    } catch (error) {
      this.listView.showErrorMessage(
        'Error while deleting book. Please try again.',
      );
    }
  }

  async addBook(title, author, genre, publishedYear) {
    try {
      const newBook = await this.bookService
        .addBook({
          title,
          author,
          genre,
          publishedYear,
        })
        .catch((e) => {
          console.log('Error when add book', e);
        });
      this.model.addBook(newBook);
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  }

  async updateBook(title, author, genre, publishedYear) {
    if (this.model.currentBook) {
      try {
        const updatedBook = {
          ...this.model.currentBook,
          title,
          author,
          genre,
          publishedYear,
        };
        await this.bookService
          .updateBook(this.model.currentBook.id, updatedBook)
          .catch((e) => {
            console.log('Error when update book', e);
          });
        this.model.updateBook(updatedBook);
      } catch (error) {
        console.error('Error updating book:', error);
        throw error;
      }
    }
  }

  async fetchBooks() {
    try {
      var books = null;
      await this.bookService
        .getAllBooks()
        .then((res) => {
          books = res.data;
        })
        .catch((e) => {
          console.log('Error when fetch books', e);
        });
      this.model.setBooks(books);
      if (this.listView) {
        this.listView.render();
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  async init() {
    try {
      await this.fetchBooks();
      this.formView.render();
    } catch (error) {
      console.error('Error initializing the app:', error);
    }
  }
}

export default BookController;
