import Book from '../models/bookModel';

class BookController {
  constructor(model, bookListView, bookFormView) {
    this.model = model;
    this.bookListView = bookListView;
    this.bookFormView = bookFormView;

    this.bookFormView.bindSubmitForm(this.handleAddBook.bind(this));
  }

  async fetchBooks() {
    try {
      const response = await fetch('http://localhost:3000/books');
      const data = await response.json();
      this.model.setBooks(data);
      this.bookListView.displayBooks(this.model.getBooks());
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  async addBook(book) {
    try {
      const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });
      const data = await response.json();
      this.model.addBook(data);

      this.bookListView.displayBooks(this.model.getBooks());
    } catch (error) {
      console.error('Error adding book:', error);
    }
  }

  handleAddBook(formData) {
    const book = new Book(formData.idBook, formData.title, formData.author);
    this.addBook(book);
  }
}

export default BookController;
