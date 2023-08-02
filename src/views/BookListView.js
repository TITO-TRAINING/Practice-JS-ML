import Table from './components/Table';
import Pagination from './components/Pagination';

class BookListView {
  constructor(toast) {
    this.onEditCallback = () => {};
    this.onDeleteCallback = () => {};
    this.listContainer = document.querySelector('#listContainer');
    this.toast = toast;

    this.currentPage = 1;
    this.pagination = '';
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
    if (button.classList.contains('edit-button')) {
      const bookId = button.dataset.id;
      if (bookId) {
        this.onEditCallback(bookId);
      } else {
        this.toast.showToast('Invalid bookId!', 'error');
      }
    } else if (button.classList.contains('delete-button')) {
      const bookId = button.dataset.id;
      if (bookId) {
        this.onDeleteCallback(bookId);
        this.toast.showToast('Book deleted successfully!', 'success');
      } else {
        this.toast.showToast('Invalid bookId!', 'error');
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
