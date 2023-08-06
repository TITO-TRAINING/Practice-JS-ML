import Table from './components/Table';
import Pagination from './components/Pagination';
import debounce from '../helpers/debounce';
import messages from '../constants/message';
import { TOAST } from '../constants/type';

class BookListView {
  constructor(toast) {
    this.onEditCallback = () => {};
    this.onDeleteCallback = () => {};
    this.onSearchCallback = () => {};
    this.listContainer = document.querySelector('#listContainer');
    this.toast = toast;
    this.currentPage = 1;
    this.pagination = '';
    this.listContainer.addEventListener('click', this.handleButtonClick);
    this.onPageChangeCallback = () => {};
    this.searchInput = document.querySelector('#searchInput');
    this.searchInput.addEventListener('input', this.handleSearchInputDebounced);
  }

  setOnEdit = (callback) => {
    this.onEditCallback = callback;
  };

  setOnDelete = (callback) => {
    this.onDeleteCallback = callback;
  };

  setOnSearch = (callback) => {
    this.onSearchCallback = callback;
  };

  onPageChange = (callback) => {
    this.onPageChangeCallback = callback;
  };

  setCurrentPage(newPage) {
    this.currentPage = newPage;
  }

  handleButtonClick = (event) => {
    const button = event.target;
    const bookId = button.dataset.id;

    if (button.classList.contains('edit-button')) {
      if (bookId) {
        this.onEditCallback(bookId);
      } else {
        this.toast.showToast(messages.invalidBookID, TOAST.ERROR);
      }
    } else if (button.classList.contains('delete-button')) {
      if (bookId) {
        this.onDeleteCallback(bookId);
        this.toast.showToast(messages.deleteSuccess, TOAST.SUCCESS);
      } else {
        this.toast.showToast(messages.invalidBookID, TOAST.ERROR);
      }
    }
  };

  handleSearchInputDebounced = debounce((event) => {
    const searchTerm = event.target.value;
    this.onSearchCallback(searchTerm);
  }, 500);

  render = (books) => {
    const rowsPerPage = 5;
    const totalPages = Math.ceil(books.length / rowsPerPage);
    const startIndex = (this.currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const booksToShow = books.slice(startIndex, endIndex);

    const tableHtml =
      booksToShow.length > 0
        ? Table.generateTable(booksToShow)
        : '<p class="no-data">No data</p>';
    this.listContainer.innerHTML = tableHtml;

    if (!this.pagination) {
      this.pagination = new Pagination(
        totalPages,
        this.currentPage,
        this.handlePageChange,
      );
    } else {
      this.pagination.totalPages = totalPages;
      this.pagination.currentPage = this.currentPage;
    }
    this.pagination.render();
  };

  handlePageChange = async (newPage) => {
    this.currentPage = newPage;
    this.onPageChangeCallback(newPage);
  };
}

export default BookListView;
