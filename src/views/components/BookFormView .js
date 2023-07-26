import Toast from './Toast';

class BookFormView {
  constructor() {
    this.formContainer = document.getElementById('formContainer');
    this.modalOverlay = document.getElementById('modalOverlay');
    this.toast = new Toast();
    this.form = null;
    this.onSubmitCallback = () => {};
    this.onCancelButtonClickCallback = () => {};
    this.bindEvents();

    this.hideModal();
  }

  setOnSubmit(callback) {
    this.onSubmitCallback = callback;
  }

  setOnCancelButtonClick(callback) {
    this.onCancelButtonClickCallback = callback;
  }

  showErrorMessage(message) {
    this.toast.show(message, 'error');
  }

  showSuccessMessage(message) {
    this.toast.show(message, 'success');
  }

  showModal() {
    this.formContainer.style.display = 'block';
    this.modalOverlay.style.display = 'block';
  }

  hideModal() {
    this.formContainer.style.display = 'none';
    this.modalOverlay.style.display = 'none';
  }

  bindEvents() {
    this.formContainer.addEventListener('submit', (event) =>
      this.handleSubmit(event),
    );
    this.formContainer.addEventListener('click', (event) =>
      this.handleButtonClick(event),
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = document.querySelector('form');
    if (form) {
      const title = form.querySelector('#titleInput').value;
      const author = form.querySelector('#authorInput').value;
      const genre = form.querySelector('#category').value;
      const publishedYear = form.querySelector('#publishedYearInput').value;

      if (this.onSubmitCallback) {
        this.onSubmitCallback(title, author, genre, publishedYear);
      }
    }
  }

  handleButtonClick(event) {
    if (event.target.id === 'cancelButton') {
      this.clearForm();

      // Check if the form was used for editing (book object provided)
      // If it was, reset the form to "Add" mode
      if (this.form && this.form.dataset.mode === 'edit') {
        this.render(); // Render the form without a book object, which sets the button label to "Add"
      }
    }
  }

  clearForm() {
    if (this.form) {
      this.form.reset();
    }
  }

  render(book) {
    const {
      title = '',
      author = '',
      genre = '',
      publishedYear = '',
    } = book || {};

    const formHtml = `
      <form id="bookForm" data-mode="${book ? 'edit' : 'add'}">
        <div class="form-group">
          <label for="titleInput">Title:</label>
          <input type="text" id="titleInput" placeholder="Title" value="${title}" required>
        </div>
        <div class="form-group">
          <label for="authorInput">Author:</label>
          <input type="text" id="authorInput" placeholder="Author" value="${author}" required>
        </div>
        <div class="form-group">
          <label for="category">Category:</label>
          <input type="text" id="category" placeholder="Category" value="${genre}" required>
        </div>
        <div class="form-group">
          <label for="publishedYearInput">Published Year:</label>
          <input type="number" id="publishedYearInput" placeholder="Published Year" value="${publishedYear}" required>
        </div>
        <div class="form-group">
          <button type="submit">${book ? 'Update' : 'Add'}</button>
          <button type="button" id="cancelButton">Cancel</button>
        </div>
      </form>
    `;

    this.formContainer.innerHTML = formHtml;
    this.form = document.getElementById('bookForm');

    const cancelButton = this.formContainer.querySelector('#cancelButton');
    if (cancelButton) {
      cancelButton.addEventListener('click', () => {
        this.clearForm();
        this.onCancelButtonClickCallback();
        this.hideModal();
      });
    }

    this.showModal();
  }
}

export default BookFormView;
