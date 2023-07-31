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

  async handleFormSubmit(title, author, category, publishedYear) {
    try {
      if (this.model.currentBook) {
        await this.updateBook(title, author, category, publishedYear);
      } else {
        await this.addBook(title, author, category, publishedYear);
      }

      await this.fetchBooks();
      this.formView.clearForm();
      this.model.currentBook;
      this.formView.render();
    } catch (error) {
      console.log(error);
    }
  }

  async handleEdit(bookId) {
    try {
      const { data } = await this.bookService.getBookById(bookId);
      if (data) {
        this.model.currentBook = data;
        this.formView.render(this.model.currentBook);
      } else {
        console.error('Book not found or invalid bookId.');
      }
    } catch (error) {
      console.error('Error while fetching book. Please try again.');
    }
  }

  async handleDelete(bookId) {
    try {
      await this.bookService.deleteBook(bookId).catch((e) => {
        console.error('Error when delete book', e);
      });
      this.model.deleteBook(bookId);
      await this.fetchBooks();
    } catch (error) {
      console.error('Error while deleting book', error);
    }
  }

  async addBook(title, author, category, publishedYear) {
    try {
      const newBook = await this.bookService.addBook({
        title,
        author,
        category,
        publishedYear,
      });
      this.model.addBook(newBook);
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  }

  async updateBook(title, author, category, publishedYear) {
    const currentBook = this.model.currentBook;

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
        this.model.updateBook(updatedBook);
      } catch (error) {
        console.error('Error updating book:', error);
        throw error;
      }
    }
  }

  async fetchBooks() {
    try {
      const res = await this.bookService.getAllBooks();
      const books = res.data;
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
    } catch (error) {
      console.error('Error initializing the app:', error);
    }
  }
}

export default BookController;
