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

  generateBookRow(book) {
    const { id, title, author, category, publishedYear } = book;

    return `
      <tr>
        <td>${id}</td>
        <td>${title}</td>
        <td>${author}</td>
        <td>${category}</td>
        <td>${publishedYear}</td>
        <td>
          <button class="editButton" data-id="${id}">Edit</button>
          <button class="deleteButton" data-id="${id}">Delete</button>
        </td>
      </tr>
    `;
  }

  render() {
    const books = this.controller.model.getBooks();
    const bookRows = books.map(this.generateBookRow);
    const booksHtml = bookRows.join('');

    const tableHtml = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Published Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${booksHtml}
        </tbody>
      </table>
    `;

    this.listContainer.innerHTML = tableHtml;
  }
}

export default BookListView;
