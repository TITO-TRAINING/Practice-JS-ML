import BookController from './controllers/bookController';
import BookModel from './models/bookModel.js';
import BookFormView from './views/BookFormView ';
import BookListView from './views/BookListView';
import Toast from './views/components/Toast';
import BookService from './api/BookApi';

const model = new BookModel(new BookService());
const formView = new BookFormView(new Toast());
const listView = new BookListView(new Toast());

const bookController = new BookController(model, formView, listView);

bookController.init();
