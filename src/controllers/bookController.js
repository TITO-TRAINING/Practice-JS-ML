class BookController {
  constructor(model, formView, listView, searchView) {
    this.model = model;
    this.formView = formView;
    this.listView = listView;
    this.searchView = searchView;

    this.formView.setOnSubmit(this.handleFormSubmit.bind(this));
    this.listView.setOnEdit(this.handleEdit.bind(this));
    this.listView.setOnDelete(this.handleDelete.bind(this));
    this.model.onDataChange = this.handleDataChange.bind(this);
  }

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
