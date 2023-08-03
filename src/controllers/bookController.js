class BookController {
  constructor(model, formView, listView) {
    this.model = model;
    this.formView = formView;
    this.listView = listView;

    this.formView.setOnSubmit(this.handleFormSubmit.bind(this));
    this.listView.setOnEdit(this.handleEdit.bind(this));
    this.listView.setOnDelete(this.handleDelete.bind(this));
    this.model.onDataChange = this.handleDataChange.bind(this);
  }

  /**
   * Handles the form submission for adding or updating a book.
   * If a current book exists, it updates the book data.
   * If a current book does not exist, it adds a new book.
   * Fetches the updated list of books after the operation.
   * @param {Object} bookData - The data of the book to be added or updated.
   */
  async handleFormSubmit(bookData) {
    try {
      if (this.model.currentBook) {
        await this.model.updateBook(bookData);
      } else {
        await this.model.addBook(bookData);
      }

      await this.model.fetchBooks();
      this.model.currentBook;
    } catch (error) {
      console.error(error);
    }
  }

  async handleEdit(bookId) {
    try {
      await this.model.Edit(bookId);
      await this.formView.render(this.model.currentBook);
    } catch (error) {
      console.error(error);
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
