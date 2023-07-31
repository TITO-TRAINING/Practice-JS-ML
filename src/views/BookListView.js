import Table from './components/Table';
import Pagination from './components/Pagination';

class BookListView {
  constructor() {
    this.onEditCallback = () => {};
    this.onDeleteCallback = () => {};
    this.listContainer = document.getElementById('listContainer');
    this.currentPage = 1;
    this.pagination = null;
    this.listContainer.addEventListener(
      'click',
      this.handleButtonClick.bind(this),
    );
  }

  setOnEdit(callback) {
    this.onEditCallback = callback;
  }

  setOnDelete(callback) {
    this.onDeleteCallback = callback;
  }

  handleButtonClick(event) {
    const button = event.target;
    if (button.classList.contains('editButton')) {
      const bookId = button.dataset.id;
      this.onEditCallback(bookId); // Empty function will be called if not set
    } else if (button.classList.contains('deleteButton')) {
      const bookId = button.dataset.id;
      this.onDeleteCallback(bookId); // Empty function will be called if not set
    }
  }

  render() {
    const books = this.controller.model.getBooks();

    // Calculate total pages based on the number of books and rowsPerPage
    const rowsPerPage = 5;
    const totalPages = Math.ceil(books.length / rowsPerPage);

    // Get the books to be displayed on the current page
    const startIndex = (this.currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const booksToShow = books.slice(startIndex, endIndex);

    // Generate the table HTML using the booksToShow array
    const tableHtml = Table.generateTable(booksToShow);
    this.listContainer.innerHTML = tableHtml;

    // Initialize or update the pagination controls
    if (!this.pagination) {
      this.pagination = new Pagination(
        totalPages,
        this.currentPage,
        this.handlePageChange.bind(this),
      );
      this.pagination.render();
    } else {
      this.pagination.totalPages = totalPages;
      this.pagination.currentPage = this.currentPage;
      this.pagination.render();
    }
  }

  handlePageChange(newPage) {
    this.currentPage = newPage;
    this.render();
  }
}

export default BookListView;
