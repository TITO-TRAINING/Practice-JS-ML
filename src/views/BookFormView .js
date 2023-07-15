class BookFormView {
  constructor() {
    this.form = document.getElementById("book-form");
    this.titleInput = document.getElementById("title");
    this.authorInput = document.getElementById("author");
  }

  getFormData() {
    const title = this.titleInput.value;
    const author = this.authorInput.value;
    return { title, author };
  }

  clearForm() {
    this.titleInput.value = "";
    this.authorInput.value = "";
  }

  bindSubmitForm(handler) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      handler(this.getFormData());
      this.clearForm();
    });
  }
}

export default BookFormView;
