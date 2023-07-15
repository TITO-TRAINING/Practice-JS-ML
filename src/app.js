import BookController from "./controllers/bookController";
import BookService from "./services/service";
import Book from "./models/bookModel";
import BookFormView from "./views/BookFormView ";
import BookListView from "./views/BookListView";

const bookService = new BookService();
const bookModel = {
  books: [],
  setBooks(books) {
    this.books = books;
  },
  getBooks() {
    return this.books;
  },
  addBook(book) {
    this.books.push(book);
  },
};
const bookListView = new BookListView();
const bookFormView = new BookFormView();
const bookController = new BookController(
  bookModel,
  bookListView,
  bookFormView
);

// Fetch and display initial books
bookController.fetchBooks();
