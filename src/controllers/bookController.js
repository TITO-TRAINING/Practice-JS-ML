import axios from 'axios';

class BookController {
  constructor() {
    this.BASE_URL = 'http://localhost:3000/books';
    this.books = [];
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

  handleEdit(bookId) {
    const foundBook = this.books.find((book) => book.id === bookId);
    if (foundBook) {
      this.currentBook = foundBook;
      this.formView.render(this.currentBook);
    } else {
      console.error('Không tìm thấy sách hoặc bookId không hợp lệ:', bookId);
      // Hiển thị thông báo lỗi hoặc xử lý theo cách khác.
    }
  }

  async handleDelete(bookId) {
    await this.deleteBook(bookId);
    this.fetchBooks();
  }

  async addBook(title = '', author = '', genre = '', publishedYear = '') {
    try {
      const response = await axios.post(this.BASE_URL, {
        title,
        author,
        genre,
        publishedYear,
      });
      this.books.push(response.data);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  }

  async updateBook(title = '', author = '', genre = '', publishedYear = '') {
    if (this.currentBook) {
      try {
        const updatedBook = { title, author, genre, publishedYear };
        await axios.put(`${this.BASE_URL}/${this.currentBook.id}`, updatedBook);
        this.currentBook.title = title;
        this.currentBook.author = author;
        this.currentBook.genre = genre;
        this.currentBook.publishedYear = publishedYear;
        this.currentBook = null;
      } catch (error) {
        console.error('Error updating book:', error);
      }
    }
  }

  async deleteBook(bookId) {
    try {
      await axios.delete(`${this.BASE_URL}/${bookId}`);
      this.books = this.books.filter((book) => book.id !== bookId);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  }

  async fetchBooks() {
    try {
      const response = await axios.get(this.BASE_URL);
      this.books = response.data;
      if (this.listView) {
        this.listView.render();
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  clearForm() {
    // this.currentBook = null;
    if (this.formView) {
      this.formView.clearForm();
    }
  }
}

export default BookController;
