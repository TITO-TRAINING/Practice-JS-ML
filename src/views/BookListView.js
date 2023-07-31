import Table from './components/Table';
import Pagination from './components/Pagination';

class BookListView {
  constructor() {
    this.onEditCallback = () => {};
    this.onDeleteCallback = () => {};
    this.listContainer = document.getElementById('listContainer');

    this.currentPage = 1; // Initialize current page to 1
    this.pagination = null;
    this.listContainer.addEventListener(
      'click',
      this.handleButtonClick.bind(this),
    );
    this.onPageChangeCallback = () => {};
  }

  setOnEdit(callback) {
    this.onEditCallback = callback;
  }

  setOnDelete(callback) {
    this.onDeleteCallback = callback;
  }

  onPageChange(callback) {
    this.onPageChangeCallback = callback;
  }

  setCurrentPage(newPage) {
    this.currentPage = newPage;
  }

  handleButtonClick(event) {
    const button = event.target;
    if (button.classList.contains('editButton')) {
      const bookId = button.dataset.id;
      console.log(bookId);
      if (bookId) {
        this.onEditCallback(bookId);
      } else {
        console.error('Invalid bookId:', bookId);
      }
    } else if (button.classList.contains('deleteButton')) {
      const bookId = button.dataset.id;
      if (bookId) {
        this.onDeleteCallback(bookId);
      } else {
        console.error('Invalid bookId:', bookId);
      }
    }
  }

  render(books) {
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
    this.onPageChangeCallback(newPage);
  }
}

export default BookListView;
