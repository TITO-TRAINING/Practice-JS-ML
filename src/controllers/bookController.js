import BookModel from '../models/bookModel';
import BookFormView from '../views/BookFormView ';
import BookListView from '../views/BookListView';

class BookController {
  constructor() {
    this.model = new BookModel();
    this.formView = new BookFormView(this);
    this.listView = new BookListView(this);

    this.formView.setOnSubmit(this.handleFormSubmit.bind(this));
    this.listView.setOnEdit(this.handleEdit.bind(this));
    this.listView.setOnDelete(this.handleDelete.bind(this));
    this.model.onDataChange = this.handleDataChange;
  }

  async handleFormSubmit(title, author, category, publishedYear) {
    try {
      if (this.model.currentBook) {
        await this.model.updateBook(title, author, category, publishedYear);
      } else {
        await this.model.addBook(title, author, category, publishedYear);
      }

      await this.model.fetchBooks();
      this.model.currentBook;
    } catch (error) {
      console.log(error);
    }
  }

  async handleEdit(bookId) {
    try {
      const { data } = await this.model.bookService.getBookById(bookId);
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
      await this.model.deleteBook(bookId);
      await this.model.fetchBooks();
    } catch (error) {
      console.error('Error deleting book', error);
    }
  }

  handlePageChange = async (newPage) => {
    try {
      this.listView.setCurrentPage(newPage);
      await this.model.fetchBooks();
    } catch (error) {
      console.error('Error handling page change:', error);
    }
  };

  handleDataChange = (data) => {
    this.listView.render(data);
  };

  async init() {
    try {
      await this.model.fetchBooks();
      this.listView.onPageChange(this.handlePageChange);
    } catch (error) {
      console.error('Error initializing the app:', error);
    }
  }
}

export default BookController;
