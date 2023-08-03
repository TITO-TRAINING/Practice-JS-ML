// Pagination.js

class Pagination {
  constructor(totalPages, currentPage, onPageChange) {
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.onPageChange = onPageChange;
    this.paginationContainer = document.getElementById('paginationContainer');
    this.paginationContainer.addEventListener(
      'click',
      this.handleButtonClick.bind(this),
    );
    this.onPageChange = onPageChange;
  }

  handleButtonClick(event) {
    const targetButton = event.target.closest('.paginationButton');
    if (!targetButton) {
      return;
    }

    const newPage = parseInt(targetButton.dataset.page);
    if (this.currentPage !== newPage) {
      this.currentPage = newPage;
      this.onPageChange(this.currentPage);
      this.render();
    }
  }

  render() {
    let paginationHTML = '';
    const maxPagesToShow = 5;

    if (this.totalPages <= maxPagesToShow) {
      for (let page = 1; page <= this.totalPages; page++) {
        paginationHTML += this.renderButton(page);
      }
    } else {
      if (this.currentPage <= Math.ceil(maxPagesToShow / 2)) {
        for (let page = 1; page <= maxPagesToShow - 1; page++) {
          paginationHTML += this.renderButton(page);
        }
        paginationHTML += this.renderEllipsis();
        paginationHTML += this.renderButton(this.totalPages);
      } else if (
        this.currentPage >=
        this.totalPages - Math.floor(maxPagesToShow / 2)
      ) {
        paginationHTML += this.renderButton(1);
        paginationHTML += this.renderEllipsis();
        for (
          let page = this.totalPages - maxPagesToShow + 2;
          page <= this.totalPages;
          page++
        ) {
          paginationHTML += this.renderButton(page);
        }
      } else {
        paginationHTML += this.renderButton(1);
        paginationHTML += this.renderEllipsis();
        for (
          let page = this.currentPage - Math.floor(maxPagesToShow / 2);
          page <= this.currentPage + Math.floor(maxPagesToShow / 2);
          page++
        ) {
          paginationHTML += this.renderButton(page);
        }
        paginationHTML += this.renderEllipsis();
        paginationHTML += this.renderButton(this.totalPages);
      }
    }

    this.paginationContainer.innerHTML = paginationHTML;
  }

  renderButton(page) {
    const activeClass = page === this.currentPage ? 'active' : '';
    return `<button class="paginationButton ${activeClass}" data-page="${page}">${page}</button>`;
  }

  renderEllipsis() {
    return `
      <button class="paginationEllipsis" disabled>
        ...
      </button>
    `;
  }
}

export default Pagination;
