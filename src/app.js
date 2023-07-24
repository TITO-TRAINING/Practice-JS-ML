import BookController from './controllers/bookController';
import BookModel from './models/bookModel';
import BookFormView from './views/BookFormView ';
import BookListView from './views/BookListView';

const bookModel = new BookModel();
const bookFormView = new BookFormView();
const bookListView = new BookListView();

const bookController = new BookController(
  bookModel,
  bookFormView,
  bookListView,
);
bookController.init();
