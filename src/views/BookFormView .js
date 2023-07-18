class BookFormView {
  constructor() {
    this.form = document.querySelector('#book-form');
    this.titleInput = document.querySelector('#title');
    this.authorInput = document.querySelector('#author');
  }

  getFormData() {
    const title = this.titleInput.value;
    const author = this.authorInput.value;
    return { title, author };
  }

  clearForm() {
    this.titleInput.value = '';
    this.authorInput.value = '';
  }

  fillForm(book) {
    this.titleInput.value = book.title;
    this.authorInput.value = book.author;
  }

  bindSubmitForm(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      handler(this.getFormData());
      this.clearForm();
    });
  }
}

export default BookFormView;
