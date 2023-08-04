import Table from './components/Table';
import Pagination from './components/Pagination';
import debounce from './components/debounce';

class BookListView {
  constructor(toast) {
    this.onEditCallback = () => {};
    this.onDeleteCallback = () => {};
    this.onSearchCallback = () => {}; // New callback for search
    this.listContainer = document.querySelector('#listContainer');
    this.toast = toast;
    this.currentPage = 1;
    this.pagination = '';
    this.listContainer.addEventListener(
      'click',
      this.handleButtonClick.bind(this),
    );
    this.onPageChangeCallback = () => {};
    this.searchInput = document.querySelector('#searchInput');
    this.searchInput.addEventListener(
      'input',
      this.handleSearchInputDebounced.bind(this),
    );
  }

  setOnEdit(callback) {
    this.onEditCallback = callback;
  }

  setOnDelete(callback) {
    this.onDeleteCallback = callback;
  }

  setOnSearch(callback) {
    // Added this method
    this.onSearchCallback = callback;
  }

  onPageChange(callback) {
    this.onPageChangeCallback = callback;
  }

  setCurrentPage(newPage) {
    this.currentPage = newPage;
  }

  // handleSearchInput(event) {
  //   const searchTerm = event.target.value.trim();
  //   this.debouncedSearch(searchTerm);
  // }

  // performSearch(searchTerm) {
  //   this.onSearchCallback(searchTerm);
  // }
  handleButtonClick(event) {
    const button = event.target;
    const bookId = button.dataset.id;

    if (button.classList.contains('edit-button')) {
      if (bookId) {
        this.onEditCallback(bookId);
      } else {
        this.toast.showToast('Invalid bookId!', 'error');
      }
    } else if (button.classList.contains('delete-button')) {
      if (bookId) {
        this.onDeleteCallback(bookId);
        this.toast.showToast('Book deleted successfully!', 'success');
      } else {
        this.toast.showToast('Invalid bookId!', 'error');
      }
    }
  }

  handleSearchInputDebounced = debounce((event) => {
    const searchTerm = event.target.value;
    this.onSearchCallback(searchTerm);
  }, 300);

  render(books) {
    // Calculate total pages based on the number of books and rowsPerPage
    const rowsPerPage = 5;
    const totalPages = Math.ceil(books.length / rowsPerPage);

    // Get the books to be displayed on the current page
    const startIndex = (this.currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const booksToShow = books.slice(startIndex, endIndex);

    // Generate the table HTML using the booksToShow array
    if (booksToShow.length > 0) {
      const tableHtml = Table.generateTable(booksToShow);
      this.listContainer.innerHTML = tableHtml;
    } else {
      // Nếu không có sách, hiển thị thông báo "No data"
      this.listContainer.innerHTML = '<p class="no-data">No data</p>';
    }

    // Initialize or update the pagination controls
    if (!this.pagination) {
      this.pagination = new Pagination(
        totalPages,
        this.currentPage,
        this.handlePageChange.bind(this),
      );
    } else {
      this.pagination.totalPages = totalPages;
      this.pagination.currentPage = this.currentPage;
    }
    this.pagination.render();
  }

  handlePageChange(newPage) {
    this.currentPage = newPage;
    this.onPageChangeCallback(newPage);
  }
}

export default BookListView;
