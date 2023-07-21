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
    this.clearForm();
    this.fetchBooks();
  }

  async handleEdit(bookId) {
    try {
      const foundBook = await BookService.getBookById(bookId);
      if (foundBook) {
        this.currentBook = foundBook;
        this.formView.render(this.currentBook);
      } else {
        console.error('Không tìm thấy sách hoặc bookId không hợp lệ:', bookId);
      }
    } catch (error) {
      console.error('Error while fetching book:', error);
    }
  }

  async handleDelete(bookId) {
    try {
      await BookService.deleteBook(bookId);
      this.fetchBooks();
    } catch (error) {
      console.error('Error while deleting book:', error);
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

  clearForm() {
    this.currentBook = null;
    if (this.formView) {
      this.formView.clearForm();
    }
  }
}

export default BookController;
