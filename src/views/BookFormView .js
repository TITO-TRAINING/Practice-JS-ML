import FormValidator from '../helpers/FormValidate';
import FormRenderer from './components/Form';

class BookFormView {
  constructor() {
    this.formContainer = document.getElementById('formContainer');
    this.modalOverlay = document.getElementById('modalOverlay');
    this.createBookButton = document.querySelector('.create-book');
    this.createBookButton.addEventListener('click', () => this.render());
    this.form = [];
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

  showModal() {
    this.formContainer.style.display = 'block';
    this.modalOverlay.style.display = 'block';
  }

  hideModal() {
    this.formContainer.style.display = 'none';
    this.modalOverlay.style.display = 'none';
  }

  // Add a method to show the success toast for validation
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
      const category = form.querySelector('#category').value;
      const publishedYear = form.querySelector('#publishedYearInput').value;

      const errors = FormValidator.validateForm(
        title,
        author,
        category,
        publishedYear,
      );

      if (Object.keys(errors).length > 0) {
        // Show error messages using the Toast class
        Object.values(errors).forEach((message) => console.log(message));
      } else {
        // Form is valid, call the onSubmitCallback
        if (this.onSubmitCallback) {
          this.onSubmitCallback(title, author, category, publishedYear);
        }
        this.hideModal();
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
    const mode = book ? 'edit' : 'add';

    // Generate the form HTML using FormRenderer

    const formHtml = FormRenderer.render(book, mode);
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
