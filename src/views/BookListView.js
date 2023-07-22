import Toast from './Toast';

class BookListView {
  constructor(controller) {
    this.onEditCallback = () => {};
    this.onDeleteCallback = () => {};
    this.listContainer = document.getElementById('listContainer');
    this.controller = controller;
    this.toast = new Toast();
    this.listContainer.addEventListener(
      'click',
      this.handleButtonClick.bind(this),
    );
  }

  setOnEdit(callback) {
    this.onEditCallback = callback;
  }

  setOnDelete(callback) {
    this.onDeleteCallback = callback;
  }

  showErrorMessage(message) {
    this.toast.show(message, 'error');
  }

  showSuccessMessage(message) {
    this.toast.show(message, 'success');
  }

  render() {
    const tableHtml = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Published Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${this.generateBookRows()}
        </tbody>
      </table>
    `;

    this.listContainer.innerHTML = tableHtml;
  }

  generateBookRows() {
    return this.controller.books
      .map(
        (book) => `
        <tr>
          <td>${book.id}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.genre}</td>
          <td>${book.publishedYear}</td>
          <td>
            <button class="editButton" data-id="${book.id}">Edit</button>
            <button class="deleteButton" data-id="${book.id}">Delete</button>
          </td>
        </tr>
      `,
      )
      .join('');
  }

  handleButtonClick(event) {
    const button = event.target;
    if (button.classList.contains('editButton')) {
      const bookId = button.dataset.id;
      this.onEditCallback(bookId); // Empty function will be called if not set
    } else if (button.classList.contains('deleteButton')) {
      const bookId = button.dataset.id;
      this.onDeleteCallback(bookId); // Empty function will be called if not set
    }
  }
}

export default BookListView;
