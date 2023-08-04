class BookController {
  constructor(model, formView, listView) {
    this.model = model;
    this.formView = formView;
    this.listView = listView;

    this.formView.setOnSubmit(this.handleFormSubmit.bind(this));
    this.listView.setOnEdit(this.handleEdit.bind(this));
    this.listView.setOnDelete(this.handleDelete.bind(this));
    this.model.onDataChange = this.handleDataChange.bind(this);
    this.listView.setOnSearch(this.handleSearch.bind(this));
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

  async handleSearch(searchTerm) {
    try {
      const filteredBooks = await this.model.searchBooks(searchTerm);
      this.listView.render(filteredBooks);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  }

  async init() {
    try {
      await this.model.fetchBooks();
      this.listView.onPageChange(this.handlePageChange);
      this.listView.setOnSearch(this.handleSearch.bind(this));
    } catch (error) {
      console.error('Error initializing the app:', error);
    }
  }
}

export default BookController;
