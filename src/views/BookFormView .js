import FormValidator from '../helpers/FormValidate';
import FormRenderer from './components/Form';
import Toast from '../views/components/Toast';

class BookFormView {
  constructor() {
    this.formContainer = document.getElementById('formContainer');
    this.modalOverlay = document.getElementById('modalOverlay');
    this.createBookButton = document.querySelector('.create-book');
    this.createBookButton.addEventListener('click', () => this.render());
    this.form = [];
    this.toast = new Toast();

    this.onSubmitCallback = () => {};
    this.onCancelButtonClickCallback = () => {};
    this.bindEvents();
  }

  setOnSubmit(callback) {
    this.onSubmitCallback = callback;
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
  getFormValues() {
    return {
      title: this.getValue('#titleInput'),
      author: this.getValue('#authorInput'),
      category: this.getValue('#category'),
      publishedYear: this.getValue('#publishedYearInput'),
    };
  }

  getValue(selector) {
    const element = this.form.querySelector(selector);
    return element ? element.value : '';
  }

  handleSubmit(event) {
    event.preventDefault();
    const bookData = this.getFormValues();
    const errors = FormValidator.validateForm(
      bookData.title,
      bookData.author,
      bookData.category,
      bookData.publishedYear,
    );

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((message) => this.toast.showToast(message));
    } else {
      if (this.onSubmitCallback) {
        this.onSubmitCallback(bookData);
        this.clearForm();
        this.toast.showToast('Book added successfully!', 'success');
      }
      this.hideModal();
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
