import FormValidator from '../helpers/FormValidate';
import FormRenderer from './components/Form';
import messages from '../constants/message';
import { TOAST, ACTION_FORM } from '../constants/type';

class BookFormView {
  constructor(toast) {
    this.toast = toast;
    this.formContainer = document.querySelector('#formContainer');
    this.modalOverlay = document.querySelector('#modalOverlay');
    this.createBookButton = document.querySelector('.create-book');
    this.createBookButton.addEventListener('click', () => this.render());
    this.form = [];

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

  bindEvents() {
    this.formContainer.addEventListener('submit', (event) =>
      this.handleSubmit(event),
    );
    this.formContainer.addEventListener('click', (event) =>
      this.handleButtonClick(event),
    );
  }

  getValue(selector) {
    const element = this.form.querySelector(selector);
    return element ? element.value : '';
  }

  getFormValues() {
    const formElements = {
      title: '#titleInput',
      author: '#authorInput',
      category: '#category',
      publishedYear: '#publishedYearInput',
    };

    const formValues = {};
    for (const [key, selector] of Object.entries(formElements)) {
      formValues[key] = this.getValue(selector);
    }

    return formValues;
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
      Object.values(errors).forEach((message) => {
        this.toast.showToast(message, TOAST.ERROR);
      });
      return;
    }

    if (this.onSubmitCallback) {
      this.onSubmitCallback(bookData);
      this.clearForm();
      this.toast.showToast(messages.addSuccess, TOAST.SUCCESS);
    }
    this.hideModal();
  }

  handleButtonClick(event) {
    if (event.target.id === 'cancelButton') {
      this.clearForm();
      if (this.form && this.form.dataset.mode === ACTION_FORM.ADD) {
        this.render();
      }
    }
  }

  clearForm() {
    if (this.form) {
      this.form.reset();
    }
  }

  render(book) {
    const mode = book ? ACTION_FORM.UPDATE : ACTION_FORM.ADD;
    const formHtml = FormRenderer.render(book, mode);
    this.formContainer.innerHTML = formHtml;
    this.form = document.querySelector('#bookForm');

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
