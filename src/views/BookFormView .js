class BookFormView {
  constructor() {
    this.formContainer = document.getElementById('formContainer');
    this.bindEvents();
  }

  setOnSubmit(callback = () => {}) {
    this.onSubmitCallback = callback;
  }

  bindEvents() {
    this.formContainer.addEventListener('submit', this.handleSubmit.bind(this));
    this.formContainer.addEventListener(
      'click',
      this.handleButtonClick.bind(this),
    );
  }

  render(book) {
    const { title, author, genre, publishedYear } = book
      ? book
      : { title: '', author: '', genre: '', publishedYear: '' };

    const formHtml = `
      <form id="bookForm">
        <div class="form-group">
          <label for="titleInput">Title:</label>
          <input type="text" id="titleInput" placeholder="Title" value="${title}" required>
        </div>
        <div class="form-group">
          <label for="authorInput">Author:</label>
          <input type="text" id="authorInput" placeholder="Author" value="${author}" required>
        </div>
        <div class="form-group">
          <label for="genreInput">Genre:</label>
          <input type="text" id="genreInput" placeholder="Genre" value="${genre}" required>
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
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.form) {
      const title = this.form.querySelector('#titleInput').value;
      const author = this.form.querySelector('#authorInput').value;
      const genre = this.form.querySelector('#genreInput').value;
      const publishedYear = this.form.querySelector(
        '#publishedYearInput',
      ).value;

      if (this.onSubmitCallback) {
        this.onSubmitCallback(title, author, genre, publishedYear);
      }
    }
  }

  handleButtonClick(event) {
    if (event.target.id === 'cancelButton') {
      this.clearForm();
    }
  }

  clearForm() {
    if (this.form) {
      this.form.reset();
    }
  }
}

export default BookFormView;
