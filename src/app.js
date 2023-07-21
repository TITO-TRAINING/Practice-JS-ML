import BookFormView from './views/BookFormView ';
import BookListView from './views/BookListView';
import BookController from './controllers/bookController';

class App {
  constructor() {
    this.controller = new BookController();
    this.formView = new BookFormView();
    this.listView = new BookListView(this.controller);

    this.controller.setView(this.formView, this.listView);
    this.formView.setOnSubmit(
      this.controller.handleFormSubmit.bind(this.controller),
    );
    this.listView.setOnEdit(this.controller.handleEdit.bind(this.controller));
    this.listView.setOnDelete(
      this.controller.handleDelete.bind(this.controller),
    );
  }

  start() {
    this.listView.render();
    this.formView.render();
  }
}

const app = new App();
app.start();
app.controller.fetchBooks();
